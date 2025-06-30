import styled from 'styled-components';

export const SalesContainer = styled.div`
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: #2980b9;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1c5980;
  }
`;

export const SalesList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SaleItem = styled.li`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Totalizer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #27ae60;
  margin-top: 20px;
  text-align: right;
`;
