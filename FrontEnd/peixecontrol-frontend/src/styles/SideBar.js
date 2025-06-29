import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarContainer = styled.nav`
  width: 250px;
  height: 100vh;
  background-color: #084298;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

export const StyledLink = styled(NavLink)`
  padding: 15px 20px;
  color: white;
  font-weight: 600;

  &.active {
    background-color: #0f52ba;
  }

  &:hover {
    background-color: #0f52ba;
  }
`;
