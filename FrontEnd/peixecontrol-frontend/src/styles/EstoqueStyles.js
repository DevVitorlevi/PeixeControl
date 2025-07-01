import styled from 'styled-components';

export const EstoqueContainer = styled.div`
  width: 70vw;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: #2c3e50;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 700;
`;

export const ButtonAdd = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 12px 22px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 25px;
  align-self: flex-end;
  transition: background-color 0.3s ease;
  font-size:1.4rem;

  &:hover {
    background-color: #1e8449;
  }

  @media (max-width: 768px) {
    align-self: center;
    width: 100%;
    max-width: 320px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 320px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    margin: 0 auto;
  }
`;

export const Thead = styled.thead`
  background-color: #084298;
  color: white;
`;

export const Th = styled.th`
  padding: 14px 12px;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: 700;

  @media (max-width: 768px) {
    padding: 12px 10px;
  }
`;

export const Td = styled.td`
  padding: 12px 10px;
  border: 1px solid #ddd;
  color: #2c3e50;

  @media (max-width: 768px) {
    padding: 10px 8px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  font-weight: 700;
  background-color: #2980b9;
  color: white;
  transition: .5s ease;
  padding: .4rem;
  border: 0;
  border-radius: .6rem;
  &:hover {
    background-color: #1c5980;
  }

  &.delete {
    background-color: red;
    color:#ffffff;

    &:hover {
      background-color: #89231d;
    }
  }
`;
