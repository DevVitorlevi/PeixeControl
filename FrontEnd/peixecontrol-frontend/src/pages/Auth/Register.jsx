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
import { User, AtSign, Eye, EyeClosed, Lock, XCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ImageSlider } from '../../components/ImageSlide';
import { FlashMessage } from '../../components/FlashMessage';
import { AuthContext } from '../../contexts/AuthContext'

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [flash, setFlash] = useState({ type: '', message: '' });
    const { login } = useContext(UserContext);
    const inputNameRef = useRef(null);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        if (inputNameRef.current) {
            inputNameRef.current.focus();
        }
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const hasNumber = (str) => /\d/.test(str);
    const hasUpperCase = (str) => /[A-Z]/.test(str);
    const hasMinLength = (str) => str.length >= 8;
    const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

    const allCriteriaMet = () => {
        const pwd = formData.password;
        return (
            hasNumber(pwd) &&
            hasUpperCase(pwd) &&
            hasMinLength(pwd) &&
            hasSpecialChar(pwd)
        );
    };

    useEffect(() => {
        setIsPasswordValid(allCriteriaMet());
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'email') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailRegex.test(value) ? '' : 'E-mail inválido',
            }));
        }

        if (name === 'password' && errors.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: '',
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
        setServerError('');
        setFlash({ type: '', message: '' });

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await api.post('/users/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                const { message, token, user } = response.data;

                setFlash({ type: 'success', message });
                localStorage.setItem('token', token);
                login(user);

                setFormData({ name: '', email: '', password: '' });

                if (inputNameRef.current) inputNameRef.current.focus();

                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } catch (err) {
                const errorMsg = err.response?.data?.message || 'Erro ao cadastrar usuário';
                setServerError(errorMsg);
                setFlash({ type: 'error', message: errorMsg });
                console.error('Erro no cadastro:', err);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShow) => !prevShow);
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
                            Junte-se ao <span>THINKER</span>
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
                                <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
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

                            <Link to="/login">Já possui conta? Entre</Link>
                        </form>
                    </FormContainer>
                </FormSpace>
            </Wrapper >
        </>
    );
};