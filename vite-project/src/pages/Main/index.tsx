import React from 'react';
import { About, AboutImage, AboutText, AboutTextDiv, AboutTitle, ButtonJobSection, Container, Image, TitleDiv } from './styles';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const birthYear = 2002; 
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  return (
    <>
        <Container>

            <Image>
              <TitleDiv> 
                <h1>Vitor Amon-Rá Fernandes</h1>
              </TitleDiv>
            </Image>

            <About>
              <AboutTitle>
                  <h1>Sobre Mim</h1>
              </AboutTitle>

              <AboutTextDiv >
                  <AboutText >
                      <p> Me chamo Vitor, tenho {age} anos e sou apaixonado por tecnologia, com foco em automação industrial e desenvolvimento web. Tenho experiência em sistemas elétricos, manutenção de maquinário industrial e desenvolvimento de aplicações modernas e eficientes. Saiba mais escolhendo uma das opções abaixo.</p>
                  </AboutText>

                  <AboutImage/>
              </AboutTextDiv>

              <ButtonJobSection>
              <button onClick={() => navigate('/Developer')}>Desenvolvedor Front-End</button>
              <button onClick={() => navigate('/Electrical-Technician')}>Técnico em Elétrica e Automação</button>
              </ButtonJobSection>
              
            </About>
        </Container>
    </>
  );
}

export default Main;