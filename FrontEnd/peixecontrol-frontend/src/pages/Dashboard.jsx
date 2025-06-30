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

    useEffect(() => {
        fetchUser();
        fetchEstoque();
        // Se tiver rota de vendas, chame aqui: fetchVendasDia();
    }, []);

    async function fetchUser() {
        try {
            const response = await api.get('/users/me'); // Certifique-se que tem uma rota para pegar o user
            setNomePeixaria(response.data.name);
        } catch (error) {
            toast.error('Erro ao carregar usuário');
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
                if (produto.quantity <= 5) { // Defina o valor de estoque baixo
                    baixoEstoque += 1;
                }
            });

            setTotalEstoque(total);
            setProdutosBaixoEstoque(baixoEstoque);
        } catch (error) {
            toast.error('Erro ao carregar estoque');
        }
    }

    // Caso você tenha rota de vendas do dia
    /*
    async function fetchVendasDia() {
        try {
            const response = await api.get('/sales/today');
            setVendasDia(response.data.total);
        } catch (error) {
            toast.error('Erro ao carregar vendas do dia');
        }
    }
    */

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
