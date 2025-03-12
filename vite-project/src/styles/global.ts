import {createGlobalStyle} from "styled-components"

export default createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Open Sans', sans-serif; 
   }
   #root{
       margin:0 auto;
   }
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #131516; 
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #743F17, #1c1c1c);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #743F17, #000);
    }   
`