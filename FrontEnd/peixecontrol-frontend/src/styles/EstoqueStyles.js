import styled from 'styled-components';

export const EstoqueContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const Title = styled.h1`
  color: #0f52ba;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: #084298;
  color: white;
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

export const ButtonAdd = styled.button`
  background-color: #0f52ba;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #084298;
  }
`;
