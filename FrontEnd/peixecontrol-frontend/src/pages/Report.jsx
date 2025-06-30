import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ContentContainer } from '../styles/ContentContainer';
import {
    ReportsContainer,
    Title,
    ReportCard,
    ReportsList,
    ReportListItem,
} from '../styles/ReportStyles';

import { ModalContent, ModalOverlay, CartList, CartItem } from '../styles/SalesStyles';


export default function Reports() {
    const [salesSummary, setSalesSummary] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const [profit, setProfit] = useState(null);
    const [salesHistory, setSalesHistory] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Alerta contínuo
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await api.get('/reports/low-stock');
                if (res.data.length > 0) {
                    res.data.forEach(product => {
                        toast.warn(`Estoque baixo: ${product.name} (${product.quantity} kg restantes)`);
                    });
                }
            } catch {
                console.error('Erro ao verificar estoque baixo');
            }
        }, 300000); // 5 min

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchSalesSummary();
        fetchTopProducts();
        fetchLowStock();
        fetchProfit();
        fetchSalesHistory();
    }, [selectedDate]);

    async function fetchSalesSummary() {
        try {
            const res = await api.get(`/reports/sales-summary?date=${selectedDate.toISOString().split('T')[0]}`);
            setSalesSummary(res.data);
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

    async function fetchProfit() {
        try {
            const res = await api.get('/reports/profit-summary');
            setProfit(res.data.totalProfit);
        } catch {
            alert('Erro ao calcular lucro');
        }
    }

    async function fetchSalesHistory() {
        try {
            const res = await api.get(`/reports/sales-history?date=${selectedDate.toISOString().split('T')[0]}`);
            setSalesHistory(res.data);
        } catch {
            alert('Erro ao carregar histórico de vendas');
        }
    }

    function handleOpenModal(sale) {
        setSelectedSale(sale);
    }

    function handleCloseModal() {
        setSelectedSale(null);
    }

    return (
        <ContentContainer>
            <ReportsContainer>
                <Title>Relatórios de Vendas</Title>

                {/* Calendário */}
                <Title>Selecionar Data</Title>
                <ReactDatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    inline
                />

                {/* Resumo de Vendas */}
                {salesSummary ? (
                    <ReportCard>
                        <p><strong>Total Vendido:</strong> R$ {salesSummary.totalSalesValue?.toFixed(2) || '0.00'}</p>
                        <p><strong>Quantidade Vendida:</strong> {salesSummary.totalQuantity ?? 0} kg</p>
                    </ReportCard>
                ) : (
                    <p>Carregando resumo...</p>
                )}

                {/* Lucro */}
                <ReportCard>
                    <p><strong>Lucro Total:</strong> R$ {profit != null ? profit.toFixed(2) : '0.00'}</p>
                </ReportCard>

                {/* Produtos Mais Vendidos */}
                <Title>Produtos Mais Vendidos</Title>
                <ReportsList>
                    {topProducts.length > 0 ? (
                        topProducts.map(prod => (
                            <ReportListItem key={prod._id}>
                                {prod.productName} — {prod.totalQuantity} kg — R$ {prod.totalSalesValue?.toFixed(2) || '0.00'}
                            </ReportListItem>
                        ))
                    ) : (
                        <p>Nenhum produto encontrado</p>
                    )}
                </ReportsList>

                {/* Estoque Baixo */}
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

                {/* Histórico Visual */}
                <Title>Vendas no Dia Selecionado</Title>
                <CartList>
                    {salesHistory.length > 0 ? (
                        salesHistory.map((sale, index) => (
                            <CartItem key={index} onClick={() => handleOpenModal(sale)}>
                                <span>Venda de {sale.items.length} item(s)</span>
                                <span>R$ {sale.total.toFixed(2)}</span>
                                <span>{new Date(sale.saleDate).toLocaleDateString()}</span>
                            </CartItem>
                        ))
                    ) : (
                        <p>Nenhuma venda registrada neste dia</p>
                    )}
                </CartList>

                {/* Modal Detalhado */}
                {selectedSale && (
                    <ReportModalOverlay onClick={handleCloseModal}>
                        <ReportModalContent onClick={(e) => e.stopPropagation()}>
                            <h2>Detalhes da Venda</h2>
                            <p>Data: {new Date(selectedSale.saleDate).toLocaleString()}</p>
                            <p>Forma de Pagamento: {selectedSale.paymentMethod}</p>
                            <ul>
                                {selectedSale.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.productName} — {item.quantitySold} kg — R$ {(item.pricePerKg * item.quantitySold).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total: R$ {selectedSale.total.toFixed(2)}</strong></p>
                        </ReportModalContent>
                    </ReportModalOverlay>
                )}
            </ReportsContainer>
        </ContentContainer>
    );
}
