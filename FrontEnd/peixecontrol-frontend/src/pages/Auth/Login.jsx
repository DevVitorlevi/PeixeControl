import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    ImageContent,
    FormSpace,
    Head,
    Wrapper,
    FormContainer,
    ButtonSubmit,
    InputContent,
} from '../../styles/Form';

import { AtSign, Eye, EyeClosed, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ImageSlider } from '../../components/ImageSlide';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const submitLock = useRef(false); // 🔒 Proteção imediata

    const inputEmailRef = useRef(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        inputEmailRef.current?.focus();
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'email') {
            setErrors(prev => ({
                ...prev,
                email: emailRegex.test(value) ? '' : 'E-mail inválido'
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitLock.current) return; // 🔒 Proteção contra múltiplos cliques
        submitLock.current = true;
        setLoading(true);

        const newErrors = {};

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Senha muito curta';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await api.post('/auth/login', formData);

                const { token, user } = response.data;

                login(user, token);

                toast.success('Login realizado com sucesso!');

                setFormData({ email: '', password: '' });

                setTimeout(() => {
                    navigate('/estoque');
                }, 1500);

            } catch (error) {
                const msg = error.response?.data?.message || 'Erro ao fazer login';
                toast.error(msg);
                console.error('Erro no login:', error);
            } finally {
                submitLock.current = false; // 🔓 Libera o clique
                setLoading(false);
            }
        } else {
            submitLock.current = false; // 🔓 Libera o clique se houver erro de validação
            setLoading(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <Wrapper>
            <ImageContent>
                <ImageSlider />
            </ImageContent>

            <FormSpace>
                <Head>
                    <h1>
                        Conecte-se <span>PeixeControl</span>
                    </h1>
                </Head>
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <InputContent>
                            <input
                                type="email"
                                name="email"
                                ref={inputEmailRef}
                                className="input"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                            />
                            <AtSign className="icon" />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </InputContent>

                        <InputContent>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="input"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Senha'
                            />
                            <Lock className="icon" />
                            <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {showPassword ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                            </span>
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </InputContent>

                        <ButtonSubmit type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </ButtonSubmit>

                        <Link to="/register">
                            Novo no PeixeControl? Cadastre-se
                        </Link>
                    </form>
                </FormContainer>
            </FormSpace>
        </Wrapper>
    );
};
