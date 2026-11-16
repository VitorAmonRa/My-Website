import React from "react";
import styled from "styled-components";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

const Card = styled(motion.div)<{ $accent: string }>`
  position: relative;
  border-radius: 20px;
  padding: 1.75rem;
  background: linear-gradient(145deg, rgba(42, 22, 10, 0.65), rgba(18, 10, 5, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transform-style: preserve-3d;
  box-shadow: 0 30px 60px -30px ${({ $accent }) => $accent}66;
  overflow: hidden;
  height: 100%;
`;

const Glare = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
`;

const Inner = styled.div`
  transform: translateZ(40px);
  position: relative;
`;

type Props = {
  accent: string;
  children: React.ReactNode;
  reducedMotion?: boolean;
};

/** Card que inclina em 3D seguindo o mouse. */
export default function TiltCard({ accent, children, reducedMotion }: Props) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 200, damping: 18 });
  const gx = useTransform(x, (v) => `${v * 100}%`);
  const gy = useTransform(y, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, ${accent}33, transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: 1000, height: "100%" }}>
      <Card
        $accent={accent}
        style={reducedMotion ? undefined : { rotateX: rx, rotateY: ry }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <Glare style={{ background: glare }} />
        <Inner>{children}</Inner>
      </Card>
    </div>
  );
}
