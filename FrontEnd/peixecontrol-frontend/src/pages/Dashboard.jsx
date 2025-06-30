import React, { useEffect, useState } from 'react';
import { ContentContainer } from '../styles/ContentContainer';
import {
    DashboardContainer,
    Greeting,
    CardsContainer,
    Card,
    CardTitle,
    CardValue,
} from '../styles/DashboardStyles';

import api from '../services/api';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const [nomePeixaria, setNomePeixaria] = useState('Peixaria');
    const [totalEstoque, setTotalEstoque] = useState(0);
    const [produtosBaixoEstoque, setProdutosBaixoEstoque] = useState(0);
    const [vendasDia, setVendasDia] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function loadDashboardData() {
        try {
            await fetchUser();
            await fetchEstoque();
            // Caso crie vendas: await fetchVendasDia();
        } catch (error) {
            toast.error('Erro ao carregar informações do dashboard.');
        } finally {
            setLoading(false);
        }
    }

    async function fetchUser() {
        try {
            const response = await api.get('/users/me');
            setNomePeixaria(response.data.name);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.response?.data || error.message);
            throw error;
        }
    }

    async function fetchEstoque() {
        try {
            const response = await api.get('/products');
            const produtos = response.data;

            let total = 0;
            let baixoEstoque = 0;

            produtos.forEach(produto => {
                total += produto.quantity;
                if (produto.quantity <= 5) {
                    baixoEstoque += 1;
                }
            });

            setTotalEstoque(total);
            setProdutosBaixoEstoque(baixoEstoque);
        } catch (error) {
            console.error('Erro ao buscar estoque:', error.response?.data || error.message);
            throw error;
        }
    }

    if (loading) {
        return (
            <ContentContainer>
                <DashboardContainer>
                    <Greeting>Carregando...</Greeting>
                </DashboardContainer>
            </ContentContainer>
        );
    }

    return (
        <ContentContainer>
            <DashboardContainer>
                <Greeting>Olá, {nomePeixaria}!</Greeting>

                <CardsContainer>
                    <Card>
                        <CardTitle>Total em Estoque</CardTitle>
                        <CardValue>{totalEstoque} kg</CardValue>
                    </Card>
                    <Card>
                        <CardTitle>Vendas do Dia</CardTitle>
                        <CardValue>R$ {vendasDia}</CardValue>
                    </Card>
                    <Card>
                        <CardTitle>Produtos com Estoque Baixo</CardTitle>
                        <CardValue>{produtosBaixoEstoque}</CardValue>
                    </Card>
                </CardsContainer>
            </DashboardContainer>
        </ContentContainer>
    );
}
