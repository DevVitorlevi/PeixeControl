import React, { useState, useEffect } from 'react';
import {
    EstoqueContainer,
    Title,
    Table,
    Thead,
    Th,
    Td,
    ButtonAdd,
    ActionButton,
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

import { ContentContainer } from '../styles/ContentContainer';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ nome: '', quantidade: '', preco: '' });
    const [editingId, setEditingId] = useState(null);

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

    useEffect(() => {
        fetchProdutos();
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

        if (!form.nome.trim()) {
            toast.error('Nome é obrigatório');
            return;
        }

        const quantidadeNum = Number(form.quantidade);
        const precoNum = Number(form.preco);

        if (!quantidadeNum || quantidadeNum <= 0) {
            toast.error('Quantidade deve ser maior que zero');
            return;
        }

        if (!precoNum || precoNum <= 0) {
            toast.error('Preço deve ser maior que zero');
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

    return (
        <ContentContainer>
            <EstoqueContainer>
                <Title>Estoque</Title>
                <ButtonAdd onClick={openAddModal}>+ Adicionar Produto</ButtonAdd>

                {loading ? (
                    <p>Carregando produtos...</p>
                ) : (
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
                            {produtos.map(produto => (
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
                            ))}
                        </tbody>
                    </Table>
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
                                />
                                <Input
                                    type="number"
                                    name="quantidade"
                                    placeholder="Quantidade (kg)"
                                    value={form.quantidade}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="preco"
                                    placeholder="Preço por kg (R$)"
                                    value={form.preco}
                                    onChange={handleChange}
                                />
                                <ButtonGroup>
                                    <Button isCancel type="button" onClick={closeModal}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</Button>
                                </ButtonGroup>
                            </Form>
                        </ModalContainer>
                    </Overlay>
                )}
            </EstoqueContainer>
        </ContentContainer>
    );
}
