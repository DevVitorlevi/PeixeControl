import React, { useState, useEffect, useRef } from 'react';
import {
    EstoqueContainer,
    Title,
    Table,
    Thead,
    Th,
    Td,
    ButtonAdd,
    ActionButton,
    SearchInput,
    PaginationContainer,
    PaginationButton,
    PaginationNumber
} from '../styles/EstoqueStyles';

import {
    Overlay,
    ModalContainer,
    ModalTitle,
    Form,
    Input,
    ButtonGroup,
    Button,
} from '../styles/ModalStyles';

import api from '../services/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const beepSound = new Audio('/sounds/notify.mp3');

export default function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ nome: '', quantidade: '', preco: '' });
    const [editingId, setEditingId] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Itens por página

    const submitLock = useRef(false);
    const toastIdsRef = useRef(new Set());

    async function fetchProdutos() {
        try {
            setLoading(true);
            const response = await api.get('/products');
            setProdutos(response.data);
        } catch (error) {
            toast.error('Erro ao carregar produtos');
        } finally {
            setLoading(false);
        }
    }

    async function checkLowStock() {
        try {
            const res = await api.get('/reports/low-stock');
            if (res.data.length > 0) {
                res.data.forEach(produto => {
                    if (!toastIdsRef.current.has(produto._id)) {
                        beepSound.play();

                        toast.warn(`Estoque baixo: ${produto.name} (${produto.quantity} kg restantes)`, {
                            onClose: () => {
                                toastIdsRef.current.delete(produto._id);
                            },
                            autoClose: 8000,
                        });
                        toastIdsRef.current.add(produto._id);
                    }
                });
            }
        } catch {
            console.error('Erro ao verificar estoque baixo');
        }
    }

    useEffect(() => {
        fetchProdutos();
        checkLowStock();

        const intervalId = setInterval(() => {
            checkLowStock();
        }, 300000);

        return () => clearInterval(intervalId);
    }, []);

    function openAddModal() {
        setForm({ nome: '', quantidade: '', preco: '' });
        setEditingId(null);
        setModalOpen(true);
    }

    function openEditModal(produto) {
        setForm({
            nome: produto.name,
            quantidade: produto.quantity,
            preco: produto.pricePerKg,
        });
        setEditingId(produto._id);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (submitLock.current) return;
        submitLock.current = true;
        setSubmitLoading(true);

        if (!form.nome.trim()) {
            toast.error('Nome é obrigatório');
            submitLock.current = false;
            setSubmitLoading(false);
            return;
        }

        const quantidadeNum = Number(form.quantidade);
        const precoNum = Number(form.preco);

        if (!quantidadeNum || quantidadeNum <= 0) {
            toast.error('Quantidade deve ser maior que zero');
            submitLock.current = false;
            setSubmitLoading(false);
            return;
        }

        if (!precoNum || precoNum <= 0) {
            toast.error('Preço deve ser maior que zero');
            submitLock.current = false;
            setSubmitLoading(false);
            return;
        }

        const produtoEnviado = {
            name: form.nome.trim(),
            quantity: quantidadeNum,
            pricePerKg: precoNum,
        };

        try {
            if (editingId) {
                await api.patch(`/products/${editingId}`, produtoEnviado);
                toast.success('Produto atualizado com sucesso!');
            } else {
                await api.post('/products', produtoEnviado);
                toast.success('Produto adicionado com sucesso!');
            }
            closeModal();
            fetchProdutos();
        } catch (error) {
            toast.error('Erro ao salvar produto');
            console.error(error.response?.data || error.message);
        } finally {
            submitLock.current = false;
            setSubmitLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success('Produto excluído com sucesso!');
            fetchProdutos();
        } catch (error) {
            toast.error('Erro ao excluir produto');
        }
    }

    const produtosFiltrados = produtos.filter(produto =>
        produto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(produtosFiltrados.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = produtosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    return (
        <EstoqueContainer>
            <Title>Estoque</Title>

            <ButtonAdd onClick={openAddModal}>+ Adicionar Produto</ButtonAdd>
            <SearchInput
                type="text"
                placeholder="Pesquisar peixe..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <Loader />
            ) : (
                <>
                    <Table>
                        <Thead>
                            <tr>
                                <Th>Nome do Peixe</Th>
                                <Th>Quantidade (kg)</Th>
                                <Th>Preço por kg (R$)</Th>
                                <Th>Ações</Th>
                            </tr>
                        </Thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map(produto => (
                                    <tr key={produto._id}>
                                        <Td>{produto.name}</Td>
                                        <Td>{produto.quantity}</Td>
                                        <Td>{produto.pricePerKg.toFixed(2)}</Td>
                                        <Td>
                                            <ActionButton onClick={() => openEditModal(produto)}>Editar</ActionButton>
                                            <ActionButton
                                                className="delete"
                                                onClick={() => handleDelete(produto._id)}
                                            >
                                                Excluir
                                            </ActionButton>
                                        </Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Td colSpan={4} style={{ textAlign: 'center' }}>
                                        Nenhum peixe encontrado.
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {totalPages > 1 && (
                        <PaginationContainer>
                            <PaginationButton onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                                Anterior
                            </PaginationButton>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationNumber
                                    key={index + 1}
                                    onClick={() => goToPage(index + 1)}
                                    $active={currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationNumber>
                            ))}

                            <PaginationButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                Próximo
                            </PaginationButton>
                        </PaginationContainer>
                    )}
                </>
            )}

            {modalOpen && (
                <Overlay onClick={closeModal}>
                    <ModalContainer onClick={e => e.stopPropagation()}>
                        <ModalTitle>{editingId ? 'Editar Produto' : 'Adicionar Produto'}</ModalTitle>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                name="nome"
                                placeholder="Nome do Peixe"
                                value={form.nome}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                type="number"
                                name="quantidade"
                                placeholder="Quantidade (kg)"
                                value={form.quantidade}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                type="number"
                                step="0.01"
                                name="preco"
                                placeholder="Preço por kg (R$)"
                                value={form.preco}
                                onChange={handleChange}
                                required
                            />
                            <ButtonGroup>
                                <Button $isCancel type="button" onClick={closeModal}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={submitLoading}>
                                    {submitLoading ? 'Salvando...' : editingId ? 'Salvar' : 'Adicionar'}
                                </Button>
                            </ButtonGroup>
                        </Form>
                    </ModalContainer>
                </Overlay>
            )}
        </EstoqueContainer>
    );
}
