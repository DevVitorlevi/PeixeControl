import styled from 'styled-components';

export const ContentContainer = styled.main`
  max-width: 1300px;
  margin: 0 auto;       /* centraliza horizontalmente */
  padding: 0 16px;      /* espaçamento nas laterais, responsivo */
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 769px) {
    padding-left: 20px; /* espaço para sidebar desktop */
  }
`;
