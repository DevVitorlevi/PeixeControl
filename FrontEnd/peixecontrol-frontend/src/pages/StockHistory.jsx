import React, { useEffect, useState } from 'react';
import {
    Container,
    Title,
    TableWrapper,
    Table,
    PaginationContainer,
    PageButton,
    EmptyMessage,
    Loader,
    SummaryContainer,
    DatePickerContainer
} from '../styles/StockHistory';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function StockHistory() {
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // formato yyyy-mm-dd
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMovements() {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Você precisa estar logado.');
                    navigate('/login');
                    return;
                }

                // Se sua API aceitar filtro por data via query param, envie aqui
                // Exemplo: /stock-history?date=yyyy-mm-dd
                const res = await api.get('/stock-history', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { date: selectedDate }
                });

                setMovements(res.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    toast.error('Sessão expirada, faça login novamente.');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else if (error.response?.status === 403) {
                    toast.error('Assinatura expirada. Renove para continuar.');
                } else {
                    toast.error('Erro ao carregar histórico de movimentação.');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchMovements();
    }, [selectedDate, navigate]);

    // Paginação com movimentos filtrados (movements já filtrados pela API via date)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovements = movements.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(movements.length / itemsPerPage);

    // Calcular resumo do dia selecionado
    const totalEntrada = movements
        .filter(mov => mov.type.toLowerCase() === 'entrada')
        .reduce((acc, cur) => acc + cur.quantity, 0);

    const totalSaida = movements
        .filter(mov => mov.type.toLowerCase() === 'saída' || mov.type.toLowerCase() === 'saida')
        .reduce((acc, cur) => acc + cur.quantity, 0);

    function handlePageChange(page) {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    }

    function handleDateChange(e) {
        setSelectedDate(e.target.value);
        setCurrentPage(1);
    }

    return (
        <Container>
            <Title>Histórico de Movimentação do Estoque</Title>

            <DatePickerContainer>
                <input
                    type="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={new Date().toISOString().split('T')[0]}
                />
            </DatePickerContainer>

            <SummaryContainer>
                <p><strong>Resumo do dia {selectedDate}:</strong></p>
                <p>Entrada: {totalEntrada.toFixed(2)} kg</p>
                <p>Saída: {totalSaida.toFixed(2)} kg</p>
            </SummaryContainer>

            {loading ? (
                <Loader />
            ) : movements.length === 0 ? (
                <EmptyMessage>Nenhuma movimentação encontrada para essa data.</EmptyMessage>
            ) : (
                <>
                    <TableWrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Produto</th>
                                    <th>Tipo</th>
                                    <th>Quantidade (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMovements.map((mov, idx) => (
                                    <tr key={mov._id || idx}>
                                        <td>{new Date(mov.date).toLocaleString()}</td>
                                        <td>{mov.productName}</td>
                                        <td>{mov.type}</td>
                                        <td>{mov.quantity.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableWrapper>

                    {totalPages > 1 && (
                        <PaginationContainer>
                            <PageButton
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Anterior
                            </PageButton>

                            {[...Array(totalPages)].map((_, i) => (
                                <PageButton
                                    key={i + 1}
                                    active={currentPage === i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </PageButton>
                            ))}

                            <PageButton
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Próximo
                            </PageButton>
                        </PaginationContainer>
                    )}
                </>
            )}
        </Container>
    );
}
