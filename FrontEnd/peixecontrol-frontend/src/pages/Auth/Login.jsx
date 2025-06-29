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
import axios from 'axios';
import { ImageSlider } from '../../components/ImageSlide';
import { FlashMessage } from '../../components/FlashMessage';
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [flash, setFlash] = useState({ type: '', message: '' });
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

        const newErrors = {};

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Senha muito curta';
        }

        setErrors(newErrors);
        setFlash({ type: '', message: '' });

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3333/auth/login', formData);
                console.log('Resposta da API:', response.data);

                const { token, user } = response.data;

                console.log('Token recebido:', token);
                console.log('Usuário recebido:', user);

                // Chama login no contexto, que grava localStorage
                login(user, token);

                setFlash({ type: 'success', message: 'Login realizado com sucesso!' });
                setFormData({ email: '', password: '' });

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);

            } catch (error) {
                const msg = error.response?.data?.message || 'Erro ao fazer login';
                setFlash({ type: 'error', message: msg });
                console.error('Erro no login:', error);
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <>
            {flash.message && (
                <FlashMessage
                    type={flash.type}
                    message={flash.message}
                    onClose={() => setFlash({ type: '', message: '' })}
                />
            )}

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

                            <ButtonSubmit type="submit">Entrar</ButtonSubmit>
                            <Link to="/register">
                                Novo no PeixeControl? Cadastre-se
                            </Link>
                        </form>
                    </FormContainer>
                </FormSpace>
            </Wrapper>
        </>
    );
};
