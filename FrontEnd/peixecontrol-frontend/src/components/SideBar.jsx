import { NavLink } from 'react-router-dom';
import { SidebarContainer, StyledLink } from '../styles/SideBar';


export default function Sidebar() {
    return (
        <SidebarContainer>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
            <StyledLink to="/estoque">Estoque</StyledLink>
            <StyledLink to="/vendas">Vendas</StyledLink>
            <StyledLink to="/relatorios">Relatórios</StyledLink>
        </SidebarContainer>
    );
}
