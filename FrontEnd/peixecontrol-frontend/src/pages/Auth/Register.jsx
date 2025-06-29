import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    ImageContent,
    FormSpace,
    Head,
    Wrapper,
    FormContainer,
    ButtonSubmit,
    InputContent,
    PasswordCriteriaContainer,
    CriteriaItem,
    IconWrapper,
} from '../../styles/Form';

import {
    User,
    AtSign,
    Eye,
    EyeClosed,
    Lock,
    XCircle,
    CheckCircle,
} from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ImageSlider } from '../../components/ImageSlide';
import { FlashMessage } from '../../components/FlashMessage';
import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const [flash, setFlash] = useState({ type: '', message: '' });
    const [showPassword, setShowPassword] = useState(false);
    const inputNameRef = useRef(null);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        inputNameRef.current?.focus();
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Critérios de senha
    const hasNumber = (str) => /\d/.test(str);
    const hasUpperCase = (str) => /[A-Z]/.test(str);
    const hasMinLength = (str) => str.length >= 8;
    const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

    const allCriteriaMet = () =>
        hasNumber(formData.password) &&
        hasUpperCase(formData.password) &&
        hasMinLength(formData.password) &&
        hasSpecialChar(formData.password);

    useEffect(() => {
        setIsPasswordValid(allCriteriaMet());
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'email') {
            setErrors((prev) => ({
                ...prev,
                email: emailRegex.test(value) ? '' : 'E-mail inválido',
            }));
        }

        if (name === 'password' && errors.password) {
            setErrors((prev) => ({
                ...prev,
                password: '',
            }));
        }

        if (name === 'name' && errors.name && value.trim().length >= 3) {
            setErrors((prev) => ({
                ...prev,
                name: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (formData.name.trim().length < 3) {
            newErrors.name = 'Digite no mínimo 3 caracteres';
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!isPasswordValid) {
            newErrors.password = 'A senha não atende todos os critérios';
        }

        setErrors(newErrors);
        setFlash({ type: '', message: '' });

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await api.post('/auth/register', formData);
                const { message, token, user } = response.data;

                // Centraliza armazenamento no contexto
                login(user, token);

                setFlash({ type: 'success', message });
                setFormData({ name: '', email: '', password: '' });
                inputNameRef.current?.focus();

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } catch (err) {
                const errorMsg =
                    err.response?.data?.message || 'Erro ao cadastrar usuário';
                setFlash({ type: 'error', message: errorMsg });
                console.error('Erro no cadastro:', err);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
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
                            Junte-se ao <span>PeixeControl</span>
                        </h1>
                    </Head>
                    <FormContainer>
                        <form onSubmit={handleSubmit} noValidate>
                            <InputContent>
                                <input
                                    type="text"
                                    name="name"
                                    ref={inputNameRef}
                                    className="input"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nome"
                                />
                                <User className="icon" />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </InputContent>

                            <InputContent>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
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
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    placeholder="Senha"
                                    autoComplete="new-password"
                                />
                                <Lock className="icon" />
                                <span
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                    aria-label="Toggle password visibility"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') togglePasswordVisibility();
                                    }}
                                >
                                    {showPassword ? (
                                        <EyeClosed className="eye-c" />
                                    ) : (
                                        <Eye className="eye" />
                                    )}
                                </span>
                                {errors.password && (
                                    <p className="error-message">{errors.password}</p>
                                )}
                            </InputContent>

                            <PasswordCriteriaContainer $show={passwordFocused}>
                                <CriteriaItem>
                                    <IconWrapper $valid={hasNumber(formData.password)}>
                                        {hasNumber(formData.password) ? (
                                            <CheckCircle color="#3BB143" size={18} />
                                        ) : (
                                            <XCircle color="#E02424" size={18} />
                                        )}
                                    </IconWrapper>
                                    A Senha Deve Conter Pelo Menos um Número (12345...)
                                </CriteriaItem>

                                <CriteriaItem>
                                    <IconWrapper $valid={hasUpperCase(formData.password)}>
                                        {hasUpperCase(formData.password) ? (
                                            <CheckCircle color="#3BB143" size={18} />
                                        ) : (
                                            <XCircle color="#E02424" size={18} />
                                        )}
                                    </IconWrapper>
                                    A Senha Deve Conter Pelo Menos uma Letra Maiúscula (ABCD...)
                                </CriteriaItem>

                                <CriteriaItem>
                                    <IconWrapper $valid={hasMinLength(formData.password)}>
                                        {hasMinLength(formData.password) ? (
                                            <CheckCircle color="#3BB143" size={18} />
                                        ) : (
                                            <XCircle color="#E02424" size={18} />
                                        )}
                                    </IconWrapper>
                                    A Senha Deve Conter Mais de 8 Dígitos
                                </CriteriaItem>

                                <CriteriaItem>
                                    <IconWrapper $valid={hasSpecialChar(formData.password)}>
                                        {hasSpecialChar(formData.password) ? (
                                            <CheckCircle color="#3BB143" size={18} />
                                        ) : (
                                            <XCircle color="#E02424" size={18} />
                                        )}
                                    </IconWrapper>
                                    A Senha Deve Conter Pelo Menos um Caractere Especial (!@#$%...)
                                </CriteriaItem>
                            </PasswordCriteriaContainer>

                            <ButtonSubmit type="submit" disabled={!isPasswordValid}>
                                Cadastrar
                            </ButtonSubmit>

                            <Link to="/">Já possui conta? Entre</Link>
                        </form>
                    </FormContainer>
                </FormSpace>
            </Wrapper>
        </>
    );
};
