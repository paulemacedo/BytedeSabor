import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerRequest, registerSuccess, registerFailure } from '../redux/registerSlice';
import '../Styles/LoginForms.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            dispatch(registerRequest());
            // Simulação de registro
            setTimeout(() => {
                dispatch(registerSuccess(formData));
            }, 1000);
        } else {
            dispatch(registerFailure('Passwords do not match'));
        }
    };

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
                    <label htmlFor="confirmPassword" className="form-label">Confirme a Senha</label>
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
                <div className="center-btn">
                    <button type="submit" className="btn form-btn">Cadastrar</button>
                </div>
                <div className="link-container">
                   Já possui uma conta? <Link to="/login">Faça login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;