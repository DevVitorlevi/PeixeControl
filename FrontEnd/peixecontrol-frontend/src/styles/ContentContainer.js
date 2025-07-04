// ContentContainer.js - Mobile First
import styled from 'styled-components';

export const ContentContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px; /* sempre terá espaçamento lateral */
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 250px; /* Empurra o conteúdo no desktop */
  }
`;
