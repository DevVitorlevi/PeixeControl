import styled,{keyframes} from 'styled-components';


const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  } 
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeInScale} 0.3s ease forwards;
`;
export const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  animation: ${fadeInScale} 0.3s ease forwards;
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
  color: #0f52ba;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border-color: #0f52ba;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => (props.isCancel ? '#ccc' : '#007bff')};
  color: ${props => (props.isCancel ? '#333' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => (props.isCancel ? '#bbb' : '#0056b3')};
  }
`;
