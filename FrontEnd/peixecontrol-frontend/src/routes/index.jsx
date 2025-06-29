import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function PrivateLayout({ children }) {
    return (
        <>
            <Sidebar />
            <Header />
            <main style={{ marginLeft: 250, marginTop: 60, padding: 20 }}>{children}</main>
        </>
    );
}

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <PrivateLayout>
                                <Dashboard />
                            </PrivateLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
