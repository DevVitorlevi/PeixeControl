import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import {
    SalesContainer,
    Title,
    Form,
    Input,
    Select,
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
} from '../styles/SalesStyles';

export default function Sales() {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Pix');
    const [cart, setCart] = useState([]);
    const [sales, setSales] = useState([]);
    const [totalVendas, setTotalVendas] = useState(0);
    const [selectedSale, setSelectedSale] = useState(null);
    const [loading, setLoading] = useState(false);

    // Paginação
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
                void overlayRef.current.offsetWidth; // forçar reflow para animação
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
            const response = await api.get('/products');
            setProducts(response.data);
        } catch {
            toast.error('Erro ao carregar produtos');
        } finally {
            setLoading(false);
        }
    }

    async function fetchSales() {
        try {
            setLoading(true);
            const response = await api.get('/sales');
            const vendas = response.data;

            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const vendasHoje = vendas.filter(sale => {
                const saleDate = new Date(sale.saleDate);
                return saleDate >= hoje;
            });

            setSales(vendasHoje);
            setCurrentPage(1); // resetar página quando recarregar vendas

            const total = vendasHoje.reduce((acc, sale) => acc + sale.total, 0);
            setTotalVendas(total);
        } catch {
            toast.error('Erro ao carregar vendas');
        } finally {
            setLoading(false);
        }
    }

    function handleAddToCart() {
        if (!productId || !quantity || parseFloat(quantity) <= 0) {
            toast.error('Preencha todos os campos corretamente');
            return;
        }

        const product = products.find(prod => prod._id === productId);
        if (!product) {
            toast.error('Produto inválido');
            return;
        }

        const cartItem = {
            productId: product._id,
            productName: product.name,
            quantitySold: Number(quantity),
            pricePerKg: product.pricePerKg
        };

        setCart([...cart, cartItem]);
        setProductId('');
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
            await api.post('/sales', {
                items: cart,
                total,
                paymentMethod
            });

            toast.success('Venda registrada com sucesso!');
            saleSound.play().catch(() => { });

            fetchSales();
            setCart([]);
            setPaymentMethod('Pix');
        } catch {
            toast.error('Erro ao registrar venda');
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

    // PAGINAÇÃO
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

    return (
        <SalesContainer>
            <Title>Caixa - Registro de Vendas</Title>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <Form>
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

                        <Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                            <option value="Pix">Pix</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </Select>

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
