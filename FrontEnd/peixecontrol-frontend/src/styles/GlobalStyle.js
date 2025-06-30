import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin:0; padding:0; box-sizing:border-box;
  }

  body {
    font-family: 'Lexend Deca', sans-serif;
    background-color: #f5f7fa;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: inherit;
  }
`;
