import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Header principal
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

// Container da navegação separada
export const NavContainer = styled.nav`
  width: 100%;
  background-color: #084298;
  padding: 10px 0;

  @media (max-width: 768px) {
    display: none; /* escondemos no mobile pois o menu hambúrguer já cobre */
  }
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const NavLinkStyled = styled(NavLink)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 5px;
  transition: ease .4s;
  font-size: 1.4rem;
  &.active {
    background-color:#032b68;
    color: #daa520;
  }

  &:hover {
    background-color: #032b68;
    color: #daa520;
  }
`;

export const UserInfo = styled.span`
  font-weight: bold;
`;

// Logout Desktop
export const LogoutButtonDesktop = styled.button`
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

  @media (max-width: 768px) {
    display: none;
  }
`;

// Logout Mobile
export const LogoutButtonMobile = styled.button`
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

  @media (min-width: 769px) {
    display: none;
  }
`;

// Hamburguer
export const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;

  z-index: 9999;
  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: #084298;
  padding: 60px 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Transição suave */
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

export const Overlay = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;
