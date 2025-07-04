import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
    HeaderContainer,
    UserInfo,
    LogoutButtonDesktop,
    LogoutButtonMobile,
    HamburgerButton,
    MobileMenu,
    Overlay,
    NavContainer,
    NavLinks,
    NavLinkStyled,
} from '../styles/Header';

import { Menu, X } from 'lucide-react';

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(prev => !prev);
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    function handleLogout() {
        logout();
        closeMenu();
    }

    return (
        <>
            <HeaderContainer>
                <UserInfo>Olá, {user?.name || 'Usuário'}</UserInfo>

                {/* Botão logout visível só em desktop */}
                <LogoutButtonDesktop onClick={logout}>Sair da Conta</LogoutButtonDesktop>

                {/* Hamburger button mobile */}
                <HamburgerButton onClick={toggleMenu} aria-label="Menu">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </HamburgerButton>

                {/* Mobile menu drawer */}
                <Overlay open={menuOpen} onClick={closeMenu} />

                <MobileMenu open={menuOpen}>
                    <NavLinkStyled to="/estoque" onClick={closeMenu}>Estoque</NavLinkStyled>
                    <NavLinkStyled to="/vendas" onClick={closeMenu}>Vendas</NavLinkStyled>
                    <NavLinkStyled to="/relatorios" onClick={closeMenu}>Relatórios</NavLinkStyled>
                    <NavLinkStyled to="/movimentacoes" onClick={closeMenu}>Movimentações</NavLinkStyled>

                    {/* Botão logout visível só em mobile */}
                    <LogoutButtonMobile onClick={handleLogout}>Sair da Conta</LogoutButtonMobile>
                </MobileMenu>
            </HeaderContainer>

            {/* Navegação separada */}
            <NavContainer>
                <NavLinks>
                    <NavLinkStyled to="/estoque">Estoque</NavLinkStyled>
                    <NavLinkStyled to="/vendas">Vendas</NavLinkStyled>
                    <NavLinkStyled to="/relatorios">Relatórios</NavLinkStyled>
                    <NavLinkStyled to="/movimentacoes">Movimentações</NavLinkStyled>
                </NavLinks>
            </NavContainer>
        </>
    );
}
