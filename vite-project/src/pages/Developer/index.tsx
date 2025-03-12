import React from 'react';
import { FaReact, FaNodeJs, FaSass } from 'react-icons/fa';
import { SiTypescript, SiStyledcomponents, SiMongodb, SiFirebase } from 'react-icons/si';
import { Container, Title, Description, IconsContainer, StyledLink } from './styles';

const Developer: React.FC = () => {
  return (
    <Container>
      <Title>Desenvolvedor Front-End</Title>

      <Description> 
        Experiencia com desenvolvimento em Front-End e Mobile, com uma breve base em Back-End e NoSQL.
        Atualmente possuo conhecimento em React, TypeScript, Styled Components, SASS, Node.js, MongoDB e Firebase.
      </Description>

      <Description>
        <StyledLink  href="https://github.com/VitorAmonRa" target="_blank" rel="noreferrer">Github</StyledLink >
      </Description>

      <IconsContainer>
        <FaReact title="React" color="#61DAFB" />
        <SiTypescript title="TypeScript" color="#3178C6" />
        <SiStyledcomponents title="Styled Components" color="#DB7093" />
        <FaSass title="SASS" color="#CC6699" />
        <FaNodeJs title="Node.js" color="#8CC84B" />
        <SiMongodb title="MongoDB" color="#47A248" />
        <SiFirebase title="Firebase" color="#FFCA28" />
      </IconsContainer>

    </Container>
  );
};

export default Developer;
