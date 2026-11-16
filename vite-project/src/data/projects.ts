/**
 * Repositórios em destaque na seção Front-End.
 * Para adicionar um projeto, basta incluir um item nesta lista.
 * Deixe `repo` vazio em repositórios privados: o card aparece sem o link.
 */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Status dos Equipamentos",
    description:
      "Painel em tempo real da situação dos equipamentos e da posição dos spreaders de um terminal portuário. Gestão com login, painel para TV organizável (arrastar e redimensionar), relatório para PDF e versão mobile.",
    tags: ["React", "Firebase", "Styled Components", "Vite", "react-grid-layout"],
    repo: "https://github.com/VitorAmonRa/Status-dos-Equipamentos",
    accent: "#22d3ee",
  },
  {
    title: "Este portfólio",
    description:
      "Site pessoal com cena 3D interativa em WebGL, animações guiadas pelo scroll e cards com efeito de profundidade.",
    tags: ["React", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion"],
    repo: "https://github.com/VitorAmonRa/My-Website",
    demo: "https://my-website-omega-opal.vercel.app/",
    accent: "#a78bfa",
  },
];
