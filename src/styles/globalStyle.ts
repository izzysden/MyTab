import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html {
      background-color: #555;

      overflow: overlay;
    }

    img {
      -webkit-user-drag: none;
      -moz-user-drag: none;
      -ms-user-drag: none;
      user-drag: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    * {
      margin: 0;
      padding: 0;

      color: #fff;
      font-family: "Chivo";
      font-weight: 600;
      
      box-sizing: border-box;

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 64px #b9b9b9;
      }
    }
    
    @keyframes flash {
      0% {
        bottom: 24px;
        filter: brightness(75%);
      }
      50% {
        bottom: 16px;
        filter: brightness(100%) drop-shadow(0 0 8px #fff);
      }
      100% {
        bottom: 24px;
        filter: brightness(75%);
      }
    }
`;
