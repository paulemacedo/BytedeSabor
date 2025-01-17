import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail, requestRecovery, recoverySuccess, recoveryFailure } from '../redux/passwordRecoverySlice';
import '../Styles/LoginForms.css';

const PasswordRecovery = () => {
    const [email, setEmailState] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setEmail(email));
        dispatch(requestRecovery());
        // Simulação de recuperação de senha
        setTimeout(() => {
            if (email === 'user@example.com') {
                dispatch(recoverySuccess());
            } else {
                dispatch(recoveryFailure('Email not found'));
            }
        }, 1000);
    };

    return (
        <div className="container">
            <h2 id="form-title">Recover Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-input" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmailState(e.target.value)}
                        placeholder="Enter your email"
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
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="center-btn">
                    <button type="submit" className="btn login-btn">Send Recovery Email</button>
                </div>
            </form>
        </div>
    );
};

export default PasswordRecovery;