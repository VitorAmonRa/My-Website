import React from 'react';
import { Container, Title, Description, IconsContainer, SkillItem, SkillsList, StyledLink } from './styles';
import { SiSiemens} from 'react-icons/si';

const Technician: React.FC = () => {
  return (
    <Container>

      <Title>Técnico em Elétrica e Automação</Title>

      <Description>
        Experiência em sistemas elétricos e automação industrial, incluindo diagnóstico de defeitos, manutenção corretiva e emergencial.
      </Description>

      <Description>
      Manutenção em maquinas pesadas <strong> Ship To Shore, Rubbed-Tyred-Gantry, Reach Stacker, empilhadeiras, entre outros.</strong>
      </Description>

      <Description>
       <StyledLink href="https://www.linkedin.com/in/vitoramonrafernandes/" target="_blank" rel="noreferrer">Linkedin</StyledLink>
      </Description>

      <SkillsList>
        <SkillItem>STEP7</SkillItem>
        <SkillItem>TIA Portal</SkillItem>
        <SkillItem>Drive Monitor</SkillItem>
        <SkillItem>Master Driver</SkillItem>
        <SkillItem>Sinamics</SkillItem>
        <SkillItem>Diagnóstico de Defeitos</SkillItem>
        <SkillItem>Corretivas Emergenciais</SkillItem>
      </SkillsList>

      <IconsContainer>
        <SiSiemens title="STEP7" color="#0078D4" />
      </IconsContainer>
      
    </Container>
  );
};

export default Technician;
