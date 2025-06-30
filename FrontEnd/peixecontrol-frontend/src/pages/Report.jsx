import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ContentContainer } from '../styles/ContentContainer';
import {
    ReportsContainer,
    Title,
    ReportCard,
    ReportsList,
    ReportListItem
} from '../styles/ReportStyles';

export default function Reports() {
    const [salesDay, setSalesDay] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [lowStock, setLowStock] = useState([]);

    useEffect(() => {
        fetchSalesDay();
        fetchTopProducts();
        fetchLowStock();
    }, []);

    async function fetchSalesDay() {
        try {
            const res = await api.get('/reports/sales-summary?period=day');
            setSalesDay(res.data);
        } catch {
            alert('Erro ao carregar resumo de vendas');
        }
    }

    async function fetchTopProducts() {
        try {
            const res = await api.get('/reports/top-products');
            setTopProducts(res.data);
        } catch {
            alert('Erro ao carregar produtos mais vendidos');
        }
    }

    async function fetchLowStock() {
        try {
            const res = await api.get('/reports/low-stock');
            setLowStock(res.data);
        } catch {
            alert('Erro ao carregar produtos com estoque baixo');
        }
    }

    return (
        <ContentContainer>
            <ReportsContainer>
                <Title>Resumo das Vendas Hoje</Title>
                {salesDay ? (
                    <ReportCard>
                        <p>Total Vendido: R$ {salesDay.totalSalesValue.toFixed(2)}</p>
                        <p>Quantidade Vendida: {salesDay.totalQuantity} kg</p>
                    </ReportCard>
                ) : (
                    <p>Carregando...</p>
                )}

                <Title>Produtos Mais Vendidos</Title>
                <ReportsList>
                    {topProducts.length > 0 ? (
                        topProducts.map(prod => (
                            <ReportListItem key={prod._id}>
                                {prod.productName} — {prod.totalQuantity} kg — R$ {prod.totalSalesValue.toFixed(2)}
                            </ReportListItem>
                        ))
                    ) : (
                        <p>Nenhum produto encontrado</p>
                    )}
                </ReportsList>

                <Title>Produtos com Estoque Baixo</Title>
                <ReportsList>
                    {lowStock.length > 0 ? (
                        lowStock.map(prod => (
                            <ReportListItem key={prod._id}>
                                {prod.name} — {prod.quantity} kg
                            </ReportListItem>
                        ))
                    ) : (
                        <p>Nenhum produto com estoque baixo</p>
                    )}
                </ReportsList>
            </ReportsContainer>
        </ContentContainer>
    );
}
