import React, { useState, useEffect } from 'react';
import { ErrorMessage, SuccessMessage } from '../components/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, clearRegisterState } from '../redux/registerSlice';
import '../Styles/LoginForms.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [localError, setLocalError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.register);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            dispatch(registerUser({
                nome: formData.name,
                email: formData.email,
                senha: formData.password,
                isAdmin: false
            }));
        } else {
            setLocalError('As senhas não coincidem');
            const timer = setTimeout(() => {
                setLocalError(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearRegisterState());
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);
    
    // useEffect(() => {
    //     if (user) {
    //         alert('Registro bem-sucedido!');
    //         navigate('/login');
    //     }
    // }, [user, navigate]);

    useEffect(() => {
        if (user) {
            setSuccessMessage('Registro bem-sucedido!');
            const timer = setTimeout(() => {
                navigate('/login');
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [user, navigate]);


    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        return () => {
            dispatch(clearRegisterState());
        };
    }, [dispatch]);

    return (
        <div className="container">
            <h2 id="form-title">Cadastre-se</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Digite seu nome"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-input" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite seu email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirme sua senha"
                        required
                    />
                </div>
                <ErrorMessage message={error ? error.message : localError} />
                <SuccessMessage message={successMessage} />
                <div className="center-btn">
                    <button type="submit" className="btn form-btn" disabled={loading}>Registrar</button>
                </div>
                <div className="link-container">
                    Já tem uma conta? <Link to="/login">Entrar</Link>
                </div>
                
            </form>
        </div>
    );
};

export default Register;