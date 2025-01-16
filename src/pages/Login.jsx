import React from 'react';
import '../Styles/Login.css';
import '../Styles/index.css';

const Login = () => {
    return (
        <div className="login-container">
            <h2 id="form-title">Login</h2>
            
            <form id="login-form">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input 
                        type="email" 
                        className="form-input" 
                        id="email" 
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="password" 
                        placeholder="Digite sua senha"
                        required
                    />
                </div>

                <div className="mb-3 text-center">
                    <span id="toggle-link-pass">
                        <a onClick={togglePassword}>Esqueci minha senha</a>
                    </span>
                </div>

                <div className="center-btn">
                    <button type="submit" className="btn login-btn">Entrar</button>
                </div>
            </form>

            <form id="register-form" className="d-none">
                <div className="mb-3">
                    <label htmlFor="register-name" className="form-label">Nome</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        id="register-name" 
                        placeholder="Digite seu nome"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="register-email" className="form-label">E-mail</label>
                    <input 
                        type="email" 
                        className="form-input" 
                        id="register-email"
                        placeholder="Digite seu e-mail" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="register-password" className="form-label">Senha</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="register-password"
                        placeholder="Digite sua senha" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">Confirmar Senha</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="confirm-password"
                        placeholder="Confirme sua senha" 
                        required
                    />
                </div>
                
                <div className="center-btn">
                    <button type="submit" className="btn login-btn">Cadastrar</button>
                </div>
            </form>

            <form id="forgot-password-form" className="d-none">
                <div className="mb-3">
                    <label htmlFor="forgot-email" className="form-label">E-mail</label>
                    <input 
                        type="email" 
                        className="form-input" 
                        id="forgot-email"
                        placeholder="Digite seu e-mail registrado" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="verification-code" className="form-label">Código de Verificação</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        id="verification-code"
                        placeholder="Digite o código enviado" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="new-password" className="form-label">Nova Senha</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="new-password"
                        placeholder="Digite sua nova senha" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-new-password" className="form-label">Confirmar Nova Senha</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="confirm-new-password"
                        placeholder="Confirme sua nova senha" 
                        required
                    />
                </div>
                <div className="center-btn">
                    <button type="submit" className="btn login-btn">Redefinir Senha</button>
                </div>
            </form>

            <div className="mt-3 text-center">
                <span id="toggle-link">
                    Não tem uma conta? <a onClick={toggleForms}>Cadastre-se</a>
                </span>
            </div>
        </div>
    );
};

// Toggle functions
const toggleForms = () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const formTitle = document.getElementById('form-title');
    const toggleLink = document.getElementById('toggle-link');

    if (loginForm.classList.contains('d-none')) {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
        formTitle.textContent = 'Login';
        toggleLink.innerHTML = 'Não tem uma conta? <a onClick="toggleForms()">Cadastre-se</a>';
    } else {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
        formTitle.textContent = 'Cadastro';
        toggleLink.innerHTML = 'Já tem uma conta? <a onClick="toggleForms()">Faça login</a>';
    }
};

const togglePassword = () => {
    const loginForm = document.getElementById('login-form');
    const forgotForm = document.getElementById('forgot-password-form');
    const formTitle = document.getElementById('form-title');
    const toggleLink = document.getElementById('toggle-link');

    if (forgotForm.classList.contains('d-none')) {
        forgotForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
        formTitle.textContent = 'Redefinir Senha';
        toggleLink.innerHTML = '<a onClick="toggleForms()">Voltar ao Login</a>';
    }
};

export default Login;