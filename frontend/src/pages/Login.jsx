import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/loginSlice';
import '../Styles/LoginForms.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [localError, setLocalError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.login);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({
            email: formData.email,
            senha: formData.password
        }));
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            setLocalError('Email ou senha inválidos.');
            const timer = setTimeout(() => {
                setLocalError(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [error]);


    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearRegisterState());
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    return (
        <div className="container">
            <h2 id="form-title">Login</h2>
            <form onSubmit={handleSubmit}>
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
                {localError && (
                    <div className="error-container">
                        <p className="error-message">
                            <i className="bi bi-exclamation-circle-fill"></i> {localError}
                        </p>
                    </div>
                )}
                <div className="center-btn">
                    <button type="submit" className="btn form-btn" disabled={loading}>Entrar</button>
                </div>
                <div className="link-container">
                    Não tem uma conta? <Link to="/register">Registrar</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;