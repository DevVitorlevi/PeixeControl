// SideBar.js - estilização Mobile First
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HamburgerButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 28px;
  background: none;
  border: none;
  color: rgb(255, 255, 255);
  cursor: pointer;
  z-index: 1001;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Overlay = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;

  @media (min-width: 768px) {
    display: none; /* No desktop não precisa de overlay */
  }
`;

export const SidebarContainer = styled.nav`
  width: 250px;
  height: 100vh;
  background-color: #084298;
  color: white;
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? '0' : '-260px')};
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease;
  z-index: 1002;

  @media (min-width: 768px) {
    left: 0; /* Mostra a sidebar no desktop */
    position: fixed;
    transition: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none; /* Botão de fechar só no mobile */
  }
`;

export const StyledLink = styled(NavLink)`
  padding: 15px 20px;
  color: white;
  font-weight: 600;
  text-decoration: none;

  &.active {
    background-color: #0f52ba;
    color: #daa520;
  }

  &:hover {
    background-color: #0f52ba;
    color: #daa520;
  }
`;
