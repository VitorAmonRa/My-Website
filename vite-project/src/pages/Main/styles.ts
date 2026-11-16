import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const gradientText = css`
  background: linear-gradient(90deg, #c4b5fd 0%, #22d3ee 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Page = styled.div`
  position: relative;
  color: #e9e7f5;
  min-height: 100vh;
`;

export const CanvasLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse at 70% 40%, #1d0f3d 0%, #05030d 65%);
`;

export const Progress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transform-origin: 0 50%;
  background: linear-gradient(90deg, #7c3aed, #22d3ee, #f59e0b);
  z-index: 50;
`;

export const Nav = styled.nav`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.6rem 1.25rem;
  width: min(760px, calc(100% - 2rem));
  justify-content: space-between;
  border-radius: 999px;
  background: rgba(10, 8, 25, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

export const Logo = styled.a`
  font-weight: 800;
  letter-spacing: 0.05em;
  text-decoration: none;
  ${gradientText}
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  a {
    color: #cfcbe6;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s;
    &:hover {
      color: #fff;
    }
  }
  @media (max-width: 600px) {
    gap: 0.9rem;
    a {
      font-size: 0.8rem;
    }
  }
`;

export const Hero = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8vw;
  perspective: 800px;
  @media (max-width: 800px) {
    justify-content: flex-end;
    padding-bottom: 18vh;
  }
`;

export const Eyebrow = styled(motion.p)`
  font-size: 1.1rem;
  color: #a5a1c2;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const Name = styled.h1`
  font-size: clamp(2.6rem, 7vw, 6rem);
  font-weight: 800;
  line-height: 1.05;
  max-width: 12ch;
  .word {
    display: inline-block;
    white-space: nowrap;
    margin-right: 0.25em;
  }
  .word span {
    display: inline-block;
    transform-origin: bottom;
    ${gradientText}
  }
`;

export const Roles = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-top: 1.5rem;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #cfcbe6;
  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22d3ee;
    box-shadow: 0 0 12px #22d3ee;
  }
`;

export const Ctas = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.5rem;
`;

export const Button = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  ${({ $primary }) =>
    $primary &&
    css`
      border-color: transparent;
      background: linear-gradient(90deg, #7c3aed, #2563eb);
      box-shadow: 0 10px 30px -10px #7c3aed;
    `}
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px -12px #7c3aed;
  }
`;

export const ScrollHint = styled(motion.a)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  margin-left: -1rem;
  color: #a5a1c2;
  font-size: 1.4rem;
`;

export const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: 18vh 8vw 10vh;
  max-width: 1200px;
  margin: 0 auto;
  perspective: 1000px;
  scroll-margin-top: 2rem;
`;

export const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  margin-bottom: 3rem;
  small {
    display: block;
    font-size: 0.9rem;
    letter-spacing: 0.3em;
    color: #22d3ee;
    margin-bottom: 0.5rem;
  }
`;

export const SubTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin: 4rem 0 1.5rem;
`;

export const Lead = styled(motion.p)`
  font-size: 1.2rem;
  color: #cfcbe6;
  max-width: 640px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 2rem;
  align-items: stretch;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const Glass = styled(motion.div)`
  padding: 2rem;
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(30, 22, 60, 0.6), rgba(14, 10, 32, 0.55));
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  font-size: 1.15rem;
  line-height: 1.7;
  p + p {
    margin-top: 1rem;
  }
  strong {
    ${gradientText}
  }
`;

export const Photo = styled.img`
  display: block;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 16px;
`;

export const Skills = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
`;

export const Skill = styled(motion.div)<{ $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.4rem 0.75rem;
  border-radius: 16px;
  background: rgba(14, 10, 32, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  cursor: default;
  svg {
    font-size: 2.6rem;
    filter: drop-shadow(0 0 14px ${({ $color }) => $color}88);
  }
  span {
    font-size: 0.9rem;
    color: #cfcbe6;
    text-align: center;
  }
`;

export const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const ProjectHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  h4 {
    font-size: 1.35rem;
  }
`;

export const Dot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 16px ${({ $color }) => $color};
`;

export const ProjectDesc = styled.p`
  color: #cfcbe6;
  line-height: 1.6;
  margin-bottom: 1.25rem;
`;

export const Tags = styled.ul<{ $big?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin-top: 0.75rem;
  li {
    padding: ${({ $big }) => ($big ? "0.45rem 0.9rem" : "0.3rem 0.7rem")};
    font-size: ${({ $big }) => ($big ? "0.95rem" : "0.8rem")};
    border-radius: 999px;
    background: rgba(124, 58, 237, 0.15);
    border: 1px solid rgba(167, 139, 250, 0.3);
    color: #ddd6fe;
  }
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 1.5rem;
  a,
  span {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }
  span {
    color: #8b87a8;
    font-weight: 400;
  }
  a:hover {
    color: #22d3ee;
  }
`;

export const SiemensRow = styled.div`
  font-size: 7rem;
  line-height: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export const Center = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;

export const Footer = styled.footer`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 3rem 1rem;
  color: #6f6b8a;
  font-size: 0.9rem;
`;
