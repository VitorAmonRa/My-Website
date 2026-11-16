import React, { Suspense, lazy, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import { FaReact, FaNodeJs, FaSass, FaGithub, FaLinkedin, FaArrowDown, FaExternalLinkAlt } from "react-icons/fa";
import { SiTypescript, SiStyledcomponents, SiMongodb, SiFirebase, SiSiemens, SiThreedotjs } from "react-icons/si";
import { projects } from "../../data/projects";
import TiltCard from "../../components/TiltCard";
import garoto from "../../public/garoto.png";
import * as S from "./styles";

const Scene = lazy(() => import("../../components/Scene"));

const frontSkills = [
  { Icon: FaReact, name: "React", color: "#61DAFB" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { Icon: SiStyledcomponents, name: "Styled Components", color: "#DB7093" },
  { Icon: FaSass, name: "SASS", color: "#CC6699" },
  { Icon: SiThreedotjs, name: "Three.js", color: "#ffffff" },
  { Icon: FaNodeJs, name: "Node.js", color: "#8CC84B" },
  { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { Icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
];

const automationSkills = [
  "STEP7",
  "TIA Portal",
  "Drive Monitor",
  "Master Driver",
  "Sinamics",
  "Diagnóstico de defeitos",
  "Corretivas emergenciais",
];

const machines = ["Ship To Shore", "Rubber-Tyred Gantry", "Reach Stacker", "Empilhadeiras"];

const reveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const nameWords = ["Vitor", "Amon-Rá", "Fernandes"];

type Props = { section?: string };

const Main: React.FC<Props> = ({ section }) => {
  const reducedMotion = !!useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const age = new Date().getFullYear() - 2002;

  useEffect(() => {
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [section]);

  const inView = {
    variants: reveal,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.25 },
  } as const;

  return (
    <S.Page>
      <S.Progress style={{ scaleX: progress }} />

      <S.CanvasLayer aria-hidden>
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} />
        </Suspense>
      </S.CanvasLayer>

      <S.Nav>
        <S.Logo href="#inicio">VA</S.Logo>
        <S.NavLinks>
          <a href="#sobre">Sobre</a>
          <a href="#frontend">Front-End</a>
          <a href="#automacao">Automação</a>
          <a href="#contato">Contato</a>
        </S.NavLinks>
      </S.Nav>

      <main>
        {/* HERO */}
        <S.Hero id="inicio">
          <S.Eyebrow initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            Olá, eu sou
          </S.Eyebrow>
          <S.Name aria-label="Vitor Amon-Rá Fernandes">
            {nameWords.map((word, w) => (
              <span className="word" key={word} aria-hidden>
                {word.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.35 + (w * 6 + i) * 0.035, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ch}
                  </motion.span>
                ))}{" "}
              </span>
            ))}
          </S.Name>
          <S.Roles initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}>
            <span>Desenvolvedor Front-End</span>
            <i />
            <span>Técnico em Elétrica e Automação</span>
          </S.Roles>
          <S.Ctas initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }}>
            <S.Button href="#frontend" $primary>Ver projetos</S.Button>
            <S.Button href="#contato">Fale comigo</S.Button>
          </S.Ctas>
          <S.ScrollHint
            href="#sobre"
            aria-label="Rolar para baixo"
            animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <FaArrowDown />
          </S.ScrollHint>
        </S.Hero>

        {/* SOBRE */}
        <S.Section id="sobre">
          <S.SectionTitle {...inView}>
            <small>01</small> Sobre mim
          </S.SectionTitle>
          <S.AboutGrid>
            <S.Glass {...inView} custom={1}>
              <p>
                Me chamo Vitor, tenho {age} anos e sou apaixonado por tecnologia, com foco em{" "}
                <strong>automação industrial</strong> e <strong>desenvolvimento web</strong>.
              </p>
              <p>
                Tenho experiência em sistemas elétricos e manutenção de maquinário industrial pesado, e
                desenvolvo aplicações modernas, rápidas e bem acabadas. Gosto de juntar os dois mundos:
                software que resolve problema real do chão de fábrica.
              </p>
            </S.Glass>
            <motion.div {...inView} custom={2}>
              <TiltCard accent="#a78bfa" reducedMotion={reducedMotion}>
                <S.Photo src={garoto} alt="Foto de Vitor" />
              </TiltCard>
            </motion.div>
          </S.AboutGrid>
        </S.Section>

        {/* FRONT-END */}
        <S.Section id="frontend">
          <S.SectionTitle {...inView}>
            <small>02</small> Front-End
          </S.SectionTitle>
          <S.Lead {...inView} custom={1}>
            Experiência com desenvolvimento Front-End e Mobile, com base em Back-End e NoSQL.
          </S.Lead>

          <S.Skills>
            {frontSkills.map(({ Icon, name, color }, i) => (
              <S.Skill
                key={name}
                {...inView}
                custom={i * 0.5}
                whileHover={reducedMotion ? undefined : { y: -8, rotateY: 20, scale: 1.08 }}
                $color={color}
              >
                <Icon color={color} />
                <span>{name}</span>
              </S.Skill>
            ))}
          </S.Skills>

          <S.SubTitle {...inView}>Projetos em destaque</S.SubTitle>
          <S.Projects>
            {projects.map((p, i) => (
              <motion.div key={p.title} {...inView} custom={i}>
                <TiltCard accent={p.accent} reducedMotion={reducedMotion}>
                  <S.ProjectHead>
                    <S.Dot $color={p.accent} />
                    <h4>{p.title}</h4>
                  </S.ProjectHead>
                  <S.ProjectDesc>{p.description}</S.ProjectDesc>
                  <S.Tags>
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </S.Tags>
                  <S.ProjectLinks>
                    {p.repo ? (
                      <a href={p.repo} target="_blank" rel="noreferrer">
                        <FaGithub /> Código
                      </a>
                    ) : (
                      <span>Repositório privado</span>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer">
                        <FaExternalLinkAlt /> Ver online
                      </a>
                    )}
                  </S.ProjectLinks>
                </TiltCard>
              </motion.div>
            ))}
          </S.Projects>
          <S.Center {...inView}>
            <S.Button href="https://github.com/VitorAmonRa" target="_blank" rel="noreferrer">
              <FaGithub /> Todos os repositórios
            </S.Button>
          </S.Center>
        </S.Section>

        {/* AUTOMAÇÃO */}
        <S.Section id="automacao">
          <S.SectionTitle {...inView}>
            <small>03</small> Elétrica e Automação
          </S.SectionTitle>
          <S.AboutGrid>
            <S.Glass {...inView} custom={1}>
              <p>
                Experiência em sistemas elétricos e automação industrial, incluindo diagnóstico de defeitos,
                manutenção corretiva e emergencial.
              </p>
              <p>Manutenção em máquinas pesadas:</p>
              <S.Tags $big>
                {machines.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </S.Tags>
            </S.Glass>
            <S.Glass {...inView} custom={2}>
              <S.SiemensRow>
                <SiSiemens color="#00a0b0" />
              </S.SiemensRow>
              <S.Tags $big>
                {automationSkills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </S.Tags>
            </S.Glass>
          </S.AboutGrid>
        </S.Section>

        {/* CONTATO */}
        <S.Section id="contato">
          <S.SectionTitle {...inView}>
            <small>04</small> Vamos conversar?
          </S.SectionTitle>
          <S.Lead {...inView} custom={1}>
            Aberto a projetos de front-end e oportunidades em automação. Me chame por aqui:
          </S.Lead>
          <S.Center {...inView} custom={2}>
            <S.Button href="https://github.com/VitorAmonRa" target="_blank" rel="noreferrer" $primary>
              <FaGithub /> GitHub
            </S.Button>
            <S.Button href="https://www.linkedin.com/in/vitoramonrafernandes/" target="_blank" rel="noreferrer">
              <FaLinkedin /> LinkedIn
            </S.Button>
          </S.Center>
        </S.Section>
      </main>

      <S.Footer>© {new Date().getFullYear()} Vitor Amon-Rá Fernandes</S.Footer>
    </S.Page>
  );
};

export default Main;
