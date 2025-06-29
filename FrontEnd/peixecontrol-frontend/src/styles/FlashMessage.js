import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Message = styled.div`
  background-color: ${({ type }) =>
    type === 'success' ? '#28a745' : '#dc3545'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.4rem;
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  user-select: none;
  pointer-events: auto;
  cursor: default;
  min-width: 250px;
  text-align: center;
`;