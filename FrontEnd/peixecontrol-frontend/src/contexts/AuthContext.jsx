import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

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
                console.log('Usuário e token encontrados no localStorage:', storedUser, storedToken);
                setUser(JSON.parse(storedUser));
            } else {
                console.log('Nenhum usuário/token válido encontrado no localStorage');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Erro ao ler usuário do localStorage:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, []);


    function login(userData, token) {
        console.log('Função login chamada:', userData, token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        console.log('Usuário e token salvos no localStorage');
    }

    function logout() {
        console.log('Logout chamado - limpando usuário e token');
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
