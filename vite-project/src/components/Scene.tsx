import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = { reducedMotion: boolean };

/**
 * Buraco negro em tempo real (shader de tela cheia).
 * Cada pixel lança um raio de luz que é curvado pela gravidade (aproximação
 * da geodésica de Schwarzschild). Assim surgem o disco de acreção "dobrado"
 * por cima e por baixo do horizonte, o anel de fótons e as estrelas distorcidas.
 */
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uOffset;
  uniform float uOffsetY;
  uniform float uZoom;
  uniform int uSteps;

  float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
    return v;
  }
  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

  // Fundo: estrelas + nebulosa suave
  vec3 sky(vec3 d) {
    vec2 uv = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
    vec3 col = vec3(0.0);
    for (int l = 0; l < 2; l++) {
      float sc = l == 0 ? 90.0 : 220.0;
      vec2 g = uv * sc;
      vec2 id = floor(g);
      float h = hash(id + float(l) * 31.0);
      if (h > 0.965) {
        vec2 c = fract(g) - 0.5 - (vec2(hash(id + 1.3), hash(id + 7.7)) - 0.5) * 0.6;
        float tw = 0.7 + 0.3 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
        float s = exp(-dot(c, c) * (l == 0 ? 60.0 : 140.0)) * tw;
        vec3 tint = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.85, 0.7), hash(id + 3.1));
        col += tint * s * (l == 0 ? 1.4 : 0.8);
      }
    }
    float n = fbm(uv * 2.2 + vec2(uTime * 0.005, 0.0));
    float n2 = fbm(uv * 4.0 - 3.0);
    col += vec3(0.30, 0.11, 0.04) * pow(n, 3.0) * 0.9 + vec3(0.12, 0.05, 0.03) * pow(n2, 3.0) * 0.8;
    return col;
  }

  // Disco de acreção: gás girando mais rápido perto do centro (Kepler)
  vec4 disk(vec3 q, vec3 v) {
    float r = length(q.xz);
    float inner = 2.6, outer = 9.5;
    if (r < inner * 0.85 || r > outer) return vec4(0.0);
    float omega = 1.6 / pow(r, 1.5);
    vec2 p = rot(uTime * omega * 2.2) * q.xz;
    float streaks = fbm(vec2(r * 2.2, 0.0) + p * 0.9);
    float swirl = fbm(p * 1.4 + streaks * 2.0);
    float dens = smoothstep(inner * 0.85, inner * 1.15, r) * (1.0 - smoothstep(outer * 0.55, outer, r));
    dens *= 0.35 + 1.1 * swirl * swirl + 0.4 * streaks;

    float temp = clamp((r - inner) / (outer - inner), 0.0, 1.0);
    vec3 hot = vec3(1.0, 0.92, 0.80);
    vec3 warm = vec3(1.0, 0.55, 0.18);
    vec3 cool = vec3(0.75, 0.20, 0.08);
    vec3 col = mix(hot, warm, smoothstep(0.0, 0.35, temp));
    col = mix(col, cool, smoothstep(0.35, 1.0, temp));

    // Efeito Doppler: o lado que vem na nossa direção brilha mais
    vec3 tangent = normalize(vec3(-q.z, 0.0, q.x));
    float dop = dot(tangent, normalize(v));
    float beam = pow(clamp(1.0 - 0.55 * dop, 0.35, 2.0), -2.5);
    col *= beam * (2.6 / (r * 0.55));

    return vec4(col * dens, clamp(dens * 0.9, 0.0, 1.0));
  }

  void main() {
    vec2 uv = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
    uv.x -= uOffset;
    uv.y -= uOffsetY;

    // Câmera: aproxima e muda o ângulo conforme o scroll; segue levemente o mouse
    float dist = mix(17.0, 11.0, uScroll);
    float elev = mix(0.13, 0.34, smoothstep(0.0, 1.0, uScroll)) + uMouse.y * 0.04;
    float azim = uTime * 0.015 + uMouse.x * 0.12 + uScroll * 1.2;
    vec3 ro = dist * vec3(sin(azim) * cos(elev), sin(elev), -cos(azim) * cos(elev));
    vec3 fw = normalize(-ro);
    vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
    vec3 up = cross(fw, rt);
    // leve inclinação do horizonte, estilo cinema
    uv = rot(-0.12 + uScroll * 0.2) * uv;
    vec3 rd = normalize(fw * uZoom + uv.x * rt + uv.y * up);

    vec3 p = ro;
    vec3 v = rd;
    float h2 = dot(cross(p, v), cross(p, v));
    vec3 col = vec3(0.0);
    float alpha = 0.0;
    float minR = 1e5;
    bool captured = false;

    for (int i = 0; i < 400; i++) {
      if (i >= uSteps) break;
      float r = length(p);
      minR = min(minR, r);
      if (r < 1.0) { captured = true; break; }
      if (r > 40.0 && dot(p, v) > 0.0) break;
      float dt = clamp(0.06 * r, 0.03, 0.9);
      vec3 prev = p;
      vec3 acc = -1.5 * h2 * p / pow(r, 5.0);
      v += acc * dt;
      p += v * dt;
      if (prev.y * p.y < 0.0) {
        vec3 q = mix(prev, p, prev.y / (prev.y - p.y));
        vec4 d = disk(q, v);
        col += d.rgb * (1.0 - alpha);
        alpha += d.a * (1.0 - alpha);
        if (alpha > 0.98) break;
      }
    }

    if (!captured) col += sky(normalize(v)) * (1.0 - alpha);
    // brilho fino do anel de fótons (só nos raios que escapam rente ao horizonte)
    if (!captured) col += vec3(1.0, 0.65, 0.35) * exp(-(minR - 1.5) * 5.0) * 0.35 * (1.0 - alpha);

    // tom de cinema + vinheta
    col = 1.0 - exp(-col * 1.05);
    col = pow(col, vec3(0.92, 0.95, 1.0));
    vec2 vv = vUv - 0.5;
    col *= 1.0 - dot(vv, vv) * 0.9;
    // escurece um pouco depois do topo para o texto ficar legível
    col *= mix(1.0, 0.5, smoothstep(0.05, 0.25, uScroll));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function BlackHole({ reducedMotion }: Props) {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();
  const isNarrow = size.width < 800;

  const uniforms = useMemo(
    () => ({
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uOffset: { value: 0 },
      uOffsetY: { value: 0 },
      uZoom: { value: 1.6 },
      uSteps: { value: 260 },
    }),
    [],
  );

  useFrame((state, delta) => {
    const u = mat.current.uniforms;
    u.uRes.value.set(state.size.width, state.size.height);
    u.uTime.value += delta * (reducedMotion ? 0.15 : 1);
    u.uSteps.value = isNarrow ? 160 : 260;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    u.uScroll.value = THREE.MathUtils.lerp(u.uScroll.value, p, 0.06);
    u.uMouse.value.lerp(state.pointer, 0.04);

    // No topo (desktop) o buraco negro fica à direita do nome e vai para o centro ao rolar
    const t = THREE.MathUtils.smoothstep(p, 0, 0.15);
    const target = isNarrow ? 0 : THREE.MathUtils.lerp(0.42, 0.0, t);
    u.uOffset.value = THREE.MathUtils.lerp(u.uOffset.value, target, 0.06);
    // No celular o buraco negro fica menor e no alto, acima do nome
    u.uZoom.value = isNarrow ? 0.95 : 1.6;
    const targetY = isNarrow ? THREE.MathUtils.lerp(0.24, 0.0, t) : 0;
    u.uOffsetY.value = THREE.MathUtils.lerp(u.uOffsetY.value, targetY, 0.06);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthWrite={false} depthTest={false} />
    </mesh>
  );
}

export default function Scene({ reducedMotion }: Props) {
  const narrow = typeof window !== "undefined" && window.innerWidth < 800;
  return (
    <Canvas dpr={narrow ? [0.6, 0.8] : [0.7, 0.9]} gl={{ antialias: false, powerPreference: "high-performance" }}>
      <BlackHole reducedMotion={reducedMotion} />
    </Canvas>
  );
}
