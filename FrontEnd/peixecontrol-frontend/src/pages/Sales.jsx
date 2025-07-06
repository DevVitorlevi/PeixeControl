import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import ReactSelect from 'react-select';
import {
    SalesContainer,
    Title,
    Form,
    Input,
    Button,
    CartList,
    CartItem,
    RemoveButton,
    Totalizer,
    ModalOverlay,
    ModalContent,
    CloseButton,
    PaginationContainer,
    PaginationButton,
    PaginationPageInfo,
    Select as StyledSelect
} from '../styles/SalesStyles';

export default function Sales() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Pix');
    const [cart, setCart] = useState([]);
    const [sales, setSales] = useState([]);
    const [totalVendas, setTotalVendas] = useState(0);
    const [selectedSale, setSelectedSale] = useState(null);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const saleSound = useRef(new Audio('/sounds/DIN.mp3')).current;

    useEffect(() => {
        fetchProducts();
        fetchSales();
    }, []);

    useEffect(() => {
        if (selectedSale) {
            if (overlayRef.current && contentRef.current) {
                void overlayRef.current.offsetWidth;
                overlayRef.current.classList.add('open');
                contentRef.current.classList.add('open');
            }
        } else {
            if (overlayRef.current && contentRef.current) {
                contentRef.current.classList.remove('open');
                overlayRef.current.classList.remove('open');
            }
        }
    }, [selectedSale]);

    async function fetchProducts() {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await api.get('/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchSales() {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await api.get('/sales', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const vendas = response.data;

            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const vendasHoje = vendas.filter(sale => {
                const saleDate = new Date(sale.saleDate);
                return saleDate >= hoje;
            });

            setSales(vendasHoje);
            setCurrentPage(1);

            const total = vendasHoje.reduce((acc, sale) => acc + sale.total, 0);
            setTotalVendas(total);
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

    function handleAddToCart() {
        if (!selectedProduct || !quantity || parseFloat(quantity) <= 0) {
            toast.error('Preencha todos os campos corretamente');
            return;
        }

        const product = products.find(prod => prod._id === selectedProduct.value);
        if (!product) {
            toast.error('Produto inválido');
            return;
        }

        const cartItem = {
            productId: product._id,
            productName: product.name,
            quantitySold: Number(quantity),
            pricePerKg: product.pricePerKg,
        };

        setCart([...cart, cartItem]);
        setSelectedProduct(null);
        setQuantity('');
    }

    function handleRemoveFromCart(index) {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    async function handleRegisterSale() {
        if (cart.length === 0) {
            toast.error('Adicione produtos ao carrinho');
            return;
        }

        const total = cart.reduce((acc, item) => acc + (item.pricePerKg * item.quantitySold), 0);

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await api.post('/sales', {
                items: cart,
                total,
                paymentMethod,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Venda registrada com sucesso!');
            saleSound.play().catch(() => { });

            fetchSales();
            setCart([]);
            setPaymentMethod('Pix');
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    function handleClickFinalizar(e) {
        e.preventDefault();
        handleRegisterSale();
    }

    function handleSaleClick(sale) {
        setSelectedSale(sale);
    }

    function closeModal() {
        if (overlayRef.current && contentRef.current) {
            contentRef.current.classList.remove('open');
            overlayRef.current.classList.remove('open');
            setTimeout(() => setSelectedSale(null), 300);
        }
    }

    const totalPages = Math.ceil(sales.length / itemsPerPage);
    const currentSalesPage = sales.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function goToPreviousPage() {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    }

    function goToNextPage() {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    }

    const productOptions = products.map(prod => ({
        value: prod._id,
        label: `${prod.name} - R$ ${prod.pricePerKg.toFixed(2)}/kg`,
    }));

    return (
        <SalesContainer>
            <Title>Caixa - Registro de Vendas</Title>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <Form>
                        <ReactSelect
                            options={productOptions}
                            value={selectedProduct}
                            onChange={setSelectedProduct}
                            placeholder="Selecione um peixe"
                            isClearable
                            noOptionsMessage={() => "Nenhum peixe encontrado"}
                        />

                        <Input
                            type="number"
                            placeholder="Quantidade (kg)"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            min="0"
                            step="0.01"
                        />

                        <Button type="button" onClick={handleAddToCart}>Adicionar ao Carrinho</Button>

                        <CartList>
                            {cart.map((item, index) => (
                                <CartItem key={index}>
                                    {item.productName} - {item.quantitySold} kg - R$ {(item.pricePerKg * item.quantitySold).toFixed(2)}
                                    <RemoveButton onClick={() => handleRemoveFromCart(index)}>Remover</RemoveButton>
                                </CartItem>
                            ))}
                        </CartList>

                        <StyledSelect
                            as="select"
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                        >
                            <option value="Pix">Pix</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </StyledSelect>

                        <Button type="button" onClick={handleClickFinalizar}>Finalizar Venda</Button>
                    </Form>

                    <Title>Vendas do Dia</Title>
                    <CartList>
                        {currentSalesPage.length > 0 ? (
                            currentSalesPage.map((sale, index) => (
                                <CartItem
                                    key={index}
                                    onClick={() => handleSaleClick(sale)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Venda de {sale.items ? sale.items.length : 1} item(s) - R$ {sale.total.toFixed(2)}
                                </CartItem>
                            ))
                        ) : (
                            <p>Nenhuma venda registrada hoje</p>
                        )}
                    </CartList>

                    {totalPages > 1 && (
                        <PaginationContainer>
                            <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
                                Anterior
                            </PaginationButton>
                            <PaginationPageInfo>{currentPage} / {totalPages}</PaginationPageInfo>
                            <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
                                Próximo
                            </PaginationButton>
                        </PaginationContainer>
                    )}

                    <Totalizer>Total vendido hoje: R$ {totalVendas.toFixed(2)}</Totalizer>
                </>
            )}

            {selectedSale && (
                <ModalOverlay ref={overlayRef} onClick={closeModal}>
                    <ModalContent ref={contentRef} onClick={e => e.stopPropagation()}>
                        <CloseButton onClick={closeModal}>X</CloseButton>
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
                    </ModalContent>
                </ModalOverlay>
            )}
        </SalesContainer>
    );
}
