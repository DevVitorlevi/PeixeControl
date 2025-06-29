import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Estoque from '../pages/Estoque';
import Vendas from '../pages/Vendas';
import Relatorios from '../pages/Relatorios';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/estoque" element={<Estoque />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/relatorios" element={<Relatorios />} />
            </Routes>
        </BrowserRouter>
    );
}
