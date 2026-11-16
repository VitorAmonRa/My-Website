import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Space Grotesk', 'Open Sans', system-ui, sans-serif;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background: #070402;
    color: #f6ede4;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  #root{
    margin: 0 auto;
  }
  a:focus-visible, button:focus-visible {
    outline: 2px solid #fbbf24;
    outline-offset: 3px;
  }
  ::selection {
    background: #f97316;
    color: #fff;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #070402;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #f97316, #7c2d12);
    border-radius: 10px;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
`
