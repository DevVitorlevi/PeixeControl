import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Inicializa token como undefined para controlar carregamento
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        console.log('AuthProvider useEffect - lendo localStorage...');
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        try {
            if (
                storedUser &&
                storedUser !== 'undefined' &&
                storedUser !== 'null' &&
                storedToken &&
                storedToken !== 'undefined' &&
                storedToken !== 'null'
            ) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
                console.log('Usuário e token carregados com sucesso.');
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
            }
        } catch (error) {
            console.error('Erro ao ler usuário do localStorage:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
        }
    }, []);

    function login(userData, tokenData) {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
        console.log('Usuário e token salvos no localStorage');
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log('Usuário deslogado e dados removidos do localStorage');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
