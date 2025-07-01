import styled from 'styled-components';

export const SalesContainer = styled.div`
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  color: #34495e;
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
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #084298;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #084298;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  font-size: 1rem;
  &:hover {
    background-color: #2c80b4;
  }
`;

export const CartContainer = styled.div`
  margin-top: 20px;
  `;

export const CartList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CartItem = styled.li`
  background-color: #084298;
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 8px;
  font-size: 1.4rem;
  color:rgb(255, 255, 255);
  transition: background-color 0.3s;
  width: 40vw;
  &:hover {
    background-color:rgb(24, 118, 212);
  }
`;

export const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #c0392b;
  }
`;

export const Totalizer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #27ae60;
  margin-top: 20px;
  text-align: right;
`;

export const FinalizeButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e8449;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  /* Start hidden */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &.open {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 700px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.open {
    opacity: 1;
    transform: translateY(0);
  }

  h3 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 2rem;
    color: #34495e;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: rgb(245, 193, 7);
    font-weight: bold;
  }

  p {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.8rem;
    color: rgb(49, 107, 231);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #c0392b;
  }
`;
