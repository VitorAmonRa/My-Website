import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

type Props = { reducedMotion: boolean };

/** Lê o progresso do scroll (0 → 1) sem causar re-render no React. */
function useScrollProgress() {
  const progress = useRef(0);
  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.current = max > 0 ? window.scrollY / max : 0;
  });
  return progress;
}

function Core({ reducedMotion }: Props) {
  const group = useRef<THREE.Group>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);
  const scroll = useScrollProgress();

  useFrame((state, delta) => {
    const speed = reducedMotion ? 0.15 : 1;
    const p = scroll.current;
    const { pointer, viewport } = state;
    const isNarrow = viewport.width < 7;

    // Gira com o tempo e com o scroll
    group.current.rotation.y += delta * 0.15 * speed;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p * Math.PI * 1.2 + pointer.y * 0.3, 0.05);

    // No topo o núcleo fica à direita do nome; ao rolar ele recua para o fundo e
    // desliza para a borda, deixando o conteúdo sempre legível.
    const t = THREE.MathUtils.smoothstep(p, 0, 0.18);
    const targetX = isNarrow ? THREE.MathUtils.lerp(0.6, 1.6, t) : THREE.MathUtils.lerp(2.2, 4.2, t);
    const targetY = isNarrow ? THREE.MathUtils.lerp(2.5, 2.8, t) : THREE.MathUtils.lerp(0, Math.sin(p * Math.PI * 2) * 1.2, t);
    const targetZ = THREE.MathUtils.lerp(0, -3.5, t);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX + pointer.x * 0.4, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.04);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.04);
    const s = isNarrow ? 0.7 : 1;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.05));

    ringA.current.rotation.z += delta * 0.4 * speed;
    ringB.current.rotation.x += delta * 0.3 * speed;
  });

  return (
    <group ref={group} position={[2.2, 0, 0]}>
      <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.35, 32]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#2a0a5e"
            roughness={0.2}
            metalness={0.9}
            distort={reducedMotion ? 0.15 : 0.38}
            speed={reducedMotion ? 0.3 : 1.8}
          />
        </mesh>
      </Float>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 160]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[2.6, 0.012, 16, 160]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Formas pequenas flutuando ao redor, com profundidade. */
function Debris({ reducedMotion }: Props) {
  const items = useMemo(() => {
    const colors = ["#a78bfa", "#22d3ee", "#f59e0b", "#f472b6"];
    return Array.from({ length: 14 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        -2 - Math.random() * 6,
      ] as [number, number, number],
      scale: 0.12 + Math.random() * 0.28,
      color: colors[i % colors.length],
      kind: i % 3,
    }));
  }, []);

  const group = useRef<THREE.Group>(null!);
  const scroll = useScrollProgress();
  useFrame(() => {
    // Parallax: as formas sobem mais devagar que o conteúdo
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scroll.current * 6, 0.06);
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Float key={i} speed={reducedMotion ? 0 : 1 + (i % 4) * 0.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={it.position} scale={it.scale}>
            {it.kind === 0 && <octahedronGeometry args={[1, 0]} />}
            {it.kind === 1 && <torusKnotGeometry args={[0.7, 0.25, 64, 8]} />}
            {it.kind === 2 && <boxGeometry args={[1.2, 1.2, 1.2]} />}
            <meshStandardMaterial color={it.color} roughness={0.3} metalness={0.6} wireframe={i % 2 === 0} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CameraRig() {
  const scroll = useScrollProgress();
  useFrame((state) => {
    const p = scroll.current;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.3, 0.03);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7 - p * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene({ reducedMotion }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#05030d"]} />
      <fog attach="fog" args={["#05030d", 8, 18]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#a78bfa" />
      <pointLight position={[-5, -3, 2]} intensity={40} color="#22d3ee" />
      {/* Reflexos gerados localmente (sem baixar HDR) */}
      <Environment resolution={256}>
        <Lightformer intensity={3} color="#a78bfa" position={[0, 5, -9]} scale={[10, 10, 1]} />
        <Lightformer intensity={2} color="#22d3ee" position={[-6, 0, 3]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer intensity={2} color="#f59e0b" position={[6, -1, 0]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="ring" intensity={4} color="#ffffff" position={[2, 3, 6]} scale={2} />
      </Environment>
      <Stars radius={60} depth={40} count={reducedMotion ? 1500 : 4000} factor={3} fade speed={reducedMotion ? 0 : 1} />
      <Sparkles count={60} scale={[14, 9, 6]} size={2} speed={reducedMotion ? 0 : 0.4} color="#c4b5fd" />
      <Core reducedMotion={reducedMotion} />
      <Debris reducedMotion={reducedMotion} />
      <CameraRig />
    </Canvas>
  );
}
