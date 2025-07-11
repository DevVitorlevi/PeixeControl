import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Loader from '../components/Loader';
import {
    ReportsContainer,
    Title,
    ReportsList,
    ReportListItem,
    ReportModalOverlay,
    ReportModalContent,
    DailySummaryCard,
    MonthSummaryCard,
    CartList,
    CartItem,
    GridContainer,
    Card,
    FullWidthCard,
    TopActionsContainer,
    PaginationContainer,
    PaginationButton,
    PaginationPageInfo,
} from '../styles/ReportStyles';

export default function Reports() {
    const [lowStock, setLowStock] = useState([]);
    const [salesHistory, setSalesHistory] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthlySummary, setMonthlySummary] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [exportType, setExportType] = useState('daily');
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    function isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    useEffect(() => {
        fetchLowStock();
        fetchSalesHistory();
        setCurrentPage(1);
    }, [selectedDate]);

    useEffect(() => {
        fetchMonthlySummary();
    }, [selectedMonth]);

    useEffect(() => {
        if (selectedSale) {
            overlayRef.current?.classList.add('open');
            contentRef.current?.classList.add('open');
        }
    }, [selectedSale]);

    async function fetchLowStock() {
        try {
            const token = localStorage.getItem('token');
            const res = await api.get('/reports/low-stock', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLowStock(res.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    async function fetchSalesHistory() {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await api.get(`/reports/sales-history?date=${selectedDate.toISOString().split('T')[0]}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSalesHistory(res.data);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchMonthlySummary() {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const month = selectedMonth.getMonth() + 1;
            const year = selectedMonth.getFullYear();
            const res = await api.get(`/reports/monthly-summary?month=${month}&year=${year}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMonthlySummary(res.data);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    function handleApiError(error) {
        if (error.response?.status === 403) {
            alert('Sua assinatura expirou! Faça login e renove sua assinatura.');
            localStorage.removeItem('token');
            window.location.href = '/';
        } else if (error.response?.status === 401) {
            alert('Sessão expirada. Faça login novamente.');
            localStorage.removeItem('token');
            window.location.href = '/';
        } else {
            toast.error('Erro ao carregar os dados.');
            console.error(error.response?.data || error.message);
        }
    }

    function handleOpenModal(sale) {
        setSelectedSale(sale);
    }

    function handleCloseModal() {
        if (overlayRef.current && contentRef.current) {
            contentRef.current.classList.remove('open');
            overlayRef.current.classList.remove('open');
            setTimeout(() => setSelectedSale(null), 300);
        }
    }

    const dailyTotals = salesHistory.reduce(
        (acc, sale) => {
            acc.totalValue += sale.total;
            acc.totalKg += sale.items.reduce((sum, item) => sum + item.quantitySold, 0);
            return acc;
        },
        { totalValue: 0, totalKg: 0 }
    );

    const totalPages = Math.ceil(salesHistory.length / itemsPerPage);
    const currentSalesPage = salesHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function goToPreviousPage() {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    }

    function goToNextPage() {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    }

    function exportPDF(data, fileName) {
        if (data.length === 0) {
            toast.warn('Nenhuma venda para exportar.');
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(fileName, 14, 20);

        const tableData = [];
        data.forEach(sale => {
            sale.items.forEach(item => {
                tableData.push([
                    new Date(sale.saleDate).toLocaleString(),
                    item.productName,
                    `${item.quantitySold} kg`,
                    `R$ ${item.pricePerKg.toFixed(2)}`,
                    `R$ ${(item.pricePerKg * item.quantitySold).toFixed(2)}`
                ]);
            });
        });

        autoTable(doc, {
            head: [['Data', 'Produto', 'Quantidade', 'Preço por Kg', 'Total']],
            body: tableData,
            startY: 30,
        });

        const finalY = doc.lastAutoTable.finalY || 40;
        const totalValue = data.reduce((sum, sale) => sum + sale.total, 0);
        const totalKg = data.reduce((sum, sale) => sum + sale.items.reduce((acc, item) => acc + item.quantitySold, 0), 0);

        doc.text(`Total Vendido: R$ ${totalValue.toFixed(2)}`, 14, finalY + 10);
        doc.text(`Quantidade Vendida: ${totalKg.toFixed(2)} kg`, 14, finalY + 20);

        doc.save(`${fileName}.pdf`);
    }

    function handleExport() {
        if (exportType === 'daily') {
            exportPDF(salesHistory, `Relatorio-Vendas-${selectedDate.toISOString().split('T')[0]}`);
        } else if (exportType === 'monthly' && monthlySummary && monthlySummary.sales) {
            exportPDF(monthlySummary.sales, `Relatorio-Mensal-${selectedMonth.getFullYear()}-${(selectedMonth.getMonth() + 1).toString().padStart(2, '0')}`);
        }
    }

    return (
        <ReportsContainer>
            <TopActionsContainer>
                <div className="left">
                    <Title>Relatórios de Vendas</Title>
                </div>
                <div className="right">
                    <select value={exportType} onChange={(e) => setExportType(e.target.value)}>
                        <option value="daily">Relatório Diário</option>
                        <option value="monthly">Relatório Mensal</option>
                    </select>
                    <PaginationButton onClick={handleExport}>Exportar PDF</PaginationButton>
                </div>
            </TopActionsContainer>

            {loading ? <Loader /> : (
                <GridContainer>
                    <Card>
                        <Title>Selecionar Mês</Title>
                        <input
                            type="month"
                            value={isValidDate(selectedMonth) ? `${selectedMonth.getFullYear()}-${(selectedMonth.getMonth() + 1).toString().padStart(2, '0')}` : ''}
                            onChange={(e) => {
                                const [year, month] = e.target.value.split('-');
                                setSelectedMonth(new Date(year, month - 1));
                            }}
                            max={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`}
                        />
                        {monthlySummary && (
                            <MonthSummaryCard>
                                <h3>Resumo do Mês</h3>
                                <p>Total Vendido: R$ {monthlySummary.totalSalesValue.toFixed(2)}</p>
                                <p>Quantidade Vendida: {monthlySummary.totalQuantity.toFixed(2)} kg</p>
                            </MonthSummaryCard>
                        )}
                    </Card>

                    <Card>
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
                    </Card>

                    <FullWidthCard>
                        <input
                            type="date"
                            value={isValidDate(selectedDate) ? selectedDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            max={new Date().toISOString().split('T')[0]}
                        />
                        <Title>Vendas no Dia Selecionado</Title>
                        <CartList>
                            {currentSalesPage.length > 0 ? (
                                currentSalesPage.map((sale, index) => (
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

                        {totalPages > 1 && (
                            <PaginationContainer>
                                <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>Anterior</PaginationButton>
                                <PaginationPageInfo>{currentPage} / {totalPages}</PaginationPageInfo>
                                <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>Próximo</PaginationButton>
                            </PaginationContainer>
                        )}

                        {salesHistory.length > 0 && (
                            <DailySummaryCard>
                                <h3>Resumo do Dia</h3>
                                <p>Total Vendido: R$ {dailyTotals.totalValue.toFixed(2)}</p>
                                <p>Quantidade Vendida: {dailyTotals.totalKg.toFixed(2)} kg</p>
                            </DailySummaryCard>
                        )}
                    </FullWidthCard>
                </GridContainer>
            )}

            {selectedSale && (
                <ReportModalOverlay ref={overlayRef} onClick={handleCloseModal}>
                    <ReportModalContent ref={contentRef} onClick={(e) => e.stopPropagation()}>
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
    );
}
