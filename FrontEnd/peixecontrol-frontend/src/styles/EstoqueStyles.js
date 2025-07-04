import styled from 'styled-components';

export const EstoqueContainer = styled.div`
  margin: 0 auto; /* centraliza */
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%; /* deixa o conteúdo mais compacto no desktop */
  }
  @media screen and (min-width:768px){
    width: 80%;
  } 
  @media screen and (min-width:820px){
    width: 80%;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  color:#2e64ee;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 3.4rem;
    margin-bottom: 25px;
  }
`;

export const ButtonAdd = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 12px 22px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease;
  font-size: 1.4rem;

  &:hover {
    background-color: #1e8449;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const Thead = styled.thead`
  background-color: #084298;
  color: white;
  `;

export const Th = styled.th`
  padding: 12px 10px;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: 700;


  @media (min-width: 768px) {
    padding: 14px 12px;
  }
`;

export const Td = styled.td`
  padding: 10px 8px;
  border: 1px solid #ddd;
  color: #2c3e50;

  @media (min-width: 768px) {
    padding: 12px 10px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  font-weight: 700;
  background-color: #2980b9;
  color: white;
  transition: 0.3s ease;
  padding: 0.4rem 0.8rem;
  border-radius: 0.6rem;

  &:hover {
    background-color: #1c5980;
  }

  &.delete {
    background-color: red;
    color: #ffffff;

    &:hover {
      background-color: #89231d;
    }
  }
`;

export const SearchInput = styled.input`
  padding: 12px;
  width: 100%;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  font-size: 1rem;
  margin: 20px auto;
  display: block;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }

  @media (min-width: 768px) {
    max-width: 400px;
  }
`;
