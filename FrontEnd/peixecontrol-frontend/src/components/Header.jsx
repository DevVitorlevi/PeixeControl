import { useContext } from "react";
import { HeaderContainer, UserInfo, LogoutButton } from "../styles/Header";
import { AuthContext } from "../contexts/AuthContext"; // Supondo que você já tenha um contexto

export default function Header() {
    const { user, logout } = useContext(AuthContext); // Pegando o usuário e a função de logout

    return (
        <HeaderContainer>
            <UserInfo>Olá, {user?.name || "Usuário"}</UserInfo>
            <LogoutButton onClick={logout}>Sair da Conta</LogoutButton>
        </HeaderContainer>
    );
}
