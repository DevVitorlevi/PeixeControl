import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    SidebarContainer,
    StyledLink,
    HamburgerButton,
    Overlay,
    CloseButton,
} from '../styles/SideBar';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    function toggleSidebar() {
        setOpen(prev => !prev);
    }

    function closeSidebar() {
        setOpen(false);
    }

    return (
        <>
            <HamburgerButton onClick={toggleSidebar} aria-label="Menu">
                <Menu size={28} />
            </HamburgerButton>

            <Overlay open={open} onClick={closeSidebar} />

            <SidebarContainer open={open}>
                <CloseButton onClick={closeSidebar} aria-label="Fechar Menu">
                    <X size={28} />
                </CloseButton>

                <StyledLink to="/estoque" onClick={closeSidebar}>Estoque</StyledLink>
                <StyledLink to="/vendas" onClick={closeSidebar}>Vendas</StyledLink>
                <StyledLink to="/relatorios" onClick={closeSidebar}>Relatórios</StyledLink>
            </SidebarContainer>
        </>
    );
}
