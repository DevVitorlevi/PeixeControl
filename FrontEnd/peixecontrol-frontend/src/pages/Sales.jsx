import React, { useEffect, useState } from 'react';
import {
    SalesContainer,
    Title,
    Form,
    Input,
    Select,
    Button,
    SalesList,
    SaleItem,
    Totalizer
} from '../styles/SalesStyles';
import { ContentContainer } from '../styles/ContentContainer';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Sales() {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Pix');
    const [sales, setSales] = useState([]);
    const [totalVendas, setTotalVendas] = useState(0);

    useEffect(() => {
        fetchProducts();
        fetchSales();
    }, []);

    async function fetchProducts() {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            toast.error('Erro ao carregar produtos');
        }
    }

    async function fetchSales() {
        try {
            const response = await api.get('/sales');
            const vendas = response.data;

            // Filtra vendas do dia
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const vendasHoje = vendas.filter(sale => {
                const saleDate = new Date(sale.saleDate);
                return saleDate >= hoje;
            });

            setSales(vendasHoje);

            // Calcula total vendas do dia
            const total = vendasHoje.reduce((acc, sale) => acc + sale.total, 0);
            setTotalVendas(total);

        } catch (error) {
            toast.error('Erro ao carregar vendas');
        }
    }

    async function handleRegisterSale(e) {
        e.preventDefault();

        if (!productId || !quantity) {
            toast.error('Preencha todos os campos');
            return;
        }

        const product = products.find(prod => prod._id === productId);
        if (!product) {
            toast.error('Produto inválido');
            return;
        }

        try {
            await api.post('/sales', {
                productId,
                quantitySold: quantity,        // usar quantitySold aqui
                paymentMethod                  // só enviar os campos esperados no backend
            });

            toast.success('Venda registrada com sucesso!');
            fetchSales();

            // Resetar formulário
            setProductId('');
            setQuantity('');
            setPaymentMethod('Pix');
        } catch (error) {
            toast.error('Erro ao registrar venda');
            console.error(error.response?.data || error.message);
        }
    }

    return (
        <ContentContainer>
            <SalesContainer>
                <Title>Registro de Vendas</Title>

                <Form onSubmit={handleRegisterSale}>
                    <Select value={productId} onChange={e => setProductId(e.target.value)}>
                        <option value="">Selecione um peixe</option>
                        {products.map(product => (
                            <option key={product._id} value={product._id}>
                                {product.name} - R$ {product.pricePerKg}/kg
                            </option>
                        ))}
                    </Select>

                    <Input
                        type="number"
                        placeholder="Quantidade (kg)"
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        min="0"
                        step="0.01"
                    />

                    <Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="Pix">Pix</option>
                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                        <option value="Cartão de Débito">Cartão de Débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                    </Select>

                    <Button type="submit">Registrar Venda</Button>
                </Form>

                <SalesList>
                    {sales.map(sale => (
                        <SaleItem key={sale._id}>
                            <span>{sale.productName} - {sale.quantitySold} kg</span>
                            <span>R$ {sale.total.toFixed(2)}</span>
                        </SaleItem>
                    ))}
                </SalesList>

                <Totalizer>Total do Dia: R$ {totalVendas.toFixed(2)}</Totalizer>
            </SalesContainer>
        </ContentContainer>
    );
}
