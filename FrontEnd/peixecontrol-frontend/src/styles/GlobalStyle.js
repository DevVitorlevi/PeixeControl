import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth; /* Suaviza o scroll */
  }

  body {
    font-family: 'Lexend Deca', sans-serif;
    background-color: #f5f7fa;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    overflow-x: hidden; /* Evita scroll lateral no mobile */
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Ajuste padrão para imagens */
  img {
    max-width: 100%;
    display: block;
  }

  /* Garantir responsividade padrão de texto */
  h1, h2, h3, h4, h5, h6, p, span {
    word-break: break-word;
  }

  /* Remover estilos padrão de listas */
  ul, ol {
    list-style: none;
  }

  /* Remover estilos padrão de links */
  a {
    text-decoration: none;
    color: inherit;
  }
`;
