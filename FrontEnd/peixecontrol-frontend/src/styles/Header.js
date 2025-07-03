import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #084298;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const UserInfo = styled.span`
  font-weight: bold;
  text-indent: 15rem;
`;

export const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;
