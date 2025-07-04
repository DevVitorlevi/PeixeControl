import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Auth/Login';
import Header from '../components/Header';
// import Sidebar removido
import Estoque from '../pages/Estoque';
import Sales from '../pages/Sales';
import Reports from '../pages/Report';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import StockHistory from '../pages/StockHistory';

function PrivateLayout({ children }) {
    return (
        <>

            <Header />
            <main style={{ marginTop: 60, padding: 20 }}>
                {children}
            </main>
        </>
    );
}

function PrivateRoute({ children }) {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token !== undefined) {
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div>Carregando...</div>; // Pode personalizar com um spinner
    }

    return token ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/estoque"
                    element={
                        <PrivateRoute>
                            <PrivateLayout>
                                <Estoque />
                            </PrivateLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/vendas"
                    element={
                        <PrivateRoute>
                            <PrivateLayout>
                                <Sales />
                            </PrivateLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/relatorios"
                    element={
                        <PrivateRoute>
                            <PrivateLayout>
                                <Reports />
                            </PrivateLayout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/movimentacoes"
                    element={
                        <PrivateRoute>
                            <PrivateLayout>
                                <StockHistory />
                            </PrivateLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
