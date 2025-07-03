import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ContentContainer } from '../styles/ContentContainer';
import styled from 'styled-components';
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
} from '../styles/ReportStyles';

// Novo styled components para o header responsivo
const HeaderControls = styled.div`
  width: 100%;
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ExportControls = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 1rem;
  }

  button {
    padding: 8px 12px;
    border-radius: 5px;
    background-color: #27ae60;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1e8449;
    }
  }
`;

export default function Reports() {
    const [lowStock, setLowStock] = useState([]);
    const [salesHistory, setSalesHistory] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthlySummary, setMonthlySummary] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [exportType, setExportType] = useState('daily');

    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        fetchLowStock();
        fetchSalesHistory();
    }, [selectedDate]);

    useEffect(() => {
        fetchMonthlySummary();
    }, [selectedMonth]);

    async function fetchLowStock() {
        try {
            const res = await api.get('/reports/low-stock');
            setLowStock(res.data);
        } catch {
            toast.error('Erro ao carregar produtos com estoque baixo');
        }
    }

    async function fetchSalesHistory() {
        try {
            const res = await api.get(`/reports/sales-history?date=${selectedDate.toISOString().split('T')[0]}`);
            setSalesHistory(res.data);
        } catch {
            toast.error('Erro ao carregar histórico de vendas');
        }
    }

    async function fetchMonthlySummary() {
        try {
            const month = selectedMonth.getMonth() + 1;
            const year = selectedMonth.getFullYear();
            const res = await api.get(`/reports/monthly-summary?month=${month}&year=${year}`);
            setMonthlySummary(res.data);
        } catch {
            toast.error('Erro ao carregar resumo mensal');
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
        <ContentContainer>
            <ReportsContainer>
                <HeaderControls>
                    <Title>Relatórios de Vendas</Title>
                    <ExportControls>
                        <select
                            value={exportType}
                            onChange={(e) => setExportType(e.target.value)}
                            aria-label="Tipo de relatório"
                        >
                            <option value="daily">Relatório Diário</option>
                            <option value="monthly">Relatório Mensal</option>
                        </select>
                        <button onClick={handleExport}>Exportar PDF</button>
                    </ExportControls>
                </HeaderControls>

                <GridContainer>
                    <Card>
                        <Title>Selecionar Mês</Title>
                        <input
                            type="month"
                            value={`${selectedMonth.getFullYear()}-${(selectedMonth.getMonth() + 1).toString().padStart(2, '0')}`}
                            onChange={(e) => {
                                const [year, month] = e.target.value.split('-');
                                setSelectedMonth(new Date(year, month - 1));
                            }}
                            max={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
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
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            max={new Date().toISOString().split('T')[0]}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
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

                        {salesHistory.length > 0 && (
                            <DailySummaryCard>
                                <h3>Resumo do Dia</h3>
                                <p>Total Vendido: R$ {dailyTotals.totalValue.toFixed(2)}</p>
                                <p>Quantidade Vendida: {dailyTotals.totalKg.toFixed(2)} kg</p>
                            </DailySummaryCard>
                        )}
                    </FullWidthCard>
                </GridContainer>

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
        </ContentContainer>
    );
}
