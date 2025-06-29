// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Fontes e cores base */
  body {
    font-family: 'Josefin Sans', sans-serif;
    background-color: #f0f4f8;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

  a {
    color: #0066cc;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #004999;
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select, button {
    font-family: inherit;
    font-size: 1rem;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #0066cc;
    border-radius: 4px;
  }
`;

export default GlobalStyles;
