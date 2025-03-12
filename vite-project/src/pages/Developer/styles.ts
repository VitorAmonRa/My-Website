import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #121212;
  color: #fff;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 40px;
  font-size: 5rem;
`;
export const StyledLink = styled.a`
  color: #61DAFB;
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #1c86c4;
    text-decoration: underline;
  }
`;
