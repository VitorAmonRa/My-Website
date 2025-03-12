import styled, { keyframes } from "styled-components";
import interstellar from "../../public/interstellar.jpg";
import garoto from "../../public/garoto.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1.3);
  }
  to {
    transform: scale(1);
  }
`;

export const Container = styled.div`
    display: flex;  
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #fff;
    overflow: hidden;
`;
export const Image = styled.div`
    display: flex;  
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-color: #131516;
    background-image: url(${interstellar});
    animation: ${zoomIn} 2s backwards;
`;
export const TitleDiv = styled.div`
    flex-direction: column;
    color: #fff;
    padding-top: 10%;
    padding-left: 10%;
    animation: ${fadeIn} 1.5s ste ease-out;
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        border-right: 3px solid white;
        width: 0;
        animation: ${typing} 3s steps(30, end) forwards;
    }
`;
export const About = styled.section`
    display: flex; 
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: black;
    justify-content: center;
    align-items: center;
    padding-top: 10%;
    padding-bottom: 10%;
`;
export const AboutTitle = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
    }
`;
export const AboutTextDiv = styled.div`
    display: flex;
    align-items: center;
    max-width: 100%;
    justify-content: space-around;
`;
export const AboutText = styled.div`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 22px;
    width: 50%;
    height: 300px;
    border: 5px dashed white;
`;
export const AboutImage = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    padding: 1rem;
    border: 4px solid white;
    border-radius: 20px;
    background-image: url(${garoto});
    background-size: cover;
    background-position: center;
    background-color: #131516;
`;
export const ButtonJobSection = styled.section`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 100px;
        background-color: #fff;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        margin-top: 5%;
        font-size: 1.5rem;
        font-weight: 700;
        transition: background-color 0.3s ease;
        &:hover {
            background-color: #6A0DAD;
            color: #fff;
        }
    }
`;
