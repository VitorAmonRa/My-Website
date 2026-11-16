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
    background: #05030d;
    color: #e9e7f5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  #root{
    margin: 0 auto;
  }
  a:focus-visible, button:focus-visible {
    outline: 2px solid #22d3ee;
    outline-offset: 3px;
  }
  ::selection {
    background: #7c3aed;
    color: #fff;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #05030d;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #7c3aed, #22d3ee);
    border-radius: 10px;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
`
