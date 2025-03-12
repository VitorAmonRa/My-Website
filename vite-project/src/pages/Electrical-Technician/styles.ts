
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #1b1b1b;
  color: #fff;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 20px;
`;

export const SkillsList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  background-color: #333;
  border-radius: 10px;
  border: 2px white solid;
`;

export const SkillItem = styled.li`
  padding: 0 1.5rem;
`;
export const IconsContainer = styled.div`
  display: flex;
  font-size: 10rem;
`;
export const StyledLink = styled.a`
  color: #0078D4; 
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0056a3;
    text-decoration: underline;
  }
`;