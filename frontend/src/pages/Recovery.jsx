import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, requestRecovery, recoverySuccess, recoveryFailure, resetState, verifyEmailAsync, updatePasswordAsync } from '../redux/RecoverySlice.jsx';
import '../Styles/LoginForms.css';

const Recovery = () => {
    const [email, setEmailState] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.passwordRecovery);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        dispatch(setEmail(email));
        dispatch(requestRecovery());
        dispatch(verifyEmailAsync(email))
            .unwrap()
            .then(() => {
                setStep(2);
                dispatch(recoverySuccess());
            })
            .catch((error) => {
                dispatch(recoveryFailure('Email não encontrado'));
            });
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        // Simulação de verificação de código
        setTimeout(() => {
            if (verificationCode === '123456') {
                setStep(3);
                dispatch(recoverySuccess());
            } else {
                dispatch(recoveryFailure('Código de verificação inválido'));
            }
        }, 1000);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmNewPassword) {
            dispatch(updatePasswordAsync({ email, newPassword: 'açaidobom' }))
                .unwrap()
                .then(() => {
                    alert('Senha alterada com sucesso!');
                    dispatch(resetState());
                    setStep(1);
                })
                .catch((error) => {
                    dispatch(recoveryFailure('Erro ao alterar a senha'));
                });
        } else {
            dispatch(recoveryFailure('As senhas não coincidem'));
        }
    };

    return (
        <div className="container">
            <h2 id="form-title">Recuperar Sua Senha</h2>
            {step === 1 && (
                <form onSubmit={handleEmailSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmailState(e.target.value)}
                            placeholder="Digite seu email"
                            required
                        />
                    </div>
                    <div className="center-btn">
                        <button type="submit" className="btn form-btn">Enviar Código de Verificação</button>
                    </div>
                    <div className="link-container">
                        Voltar para <a href="/login">Login</a>
                    </div>
                    
                    {status === 'failed' && <p className="error">{error}</p>}
                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleCodeSubmit}>
                    <div className="mb-3">
                        <label htmlFor="verificationCode" className="form-label">Código de Verificação</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            id="verificationCode"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Digite o código de verificação"
                            required
                        />
                    </div>
                    <div className="center-btn">
                        <button type="submit" className="btn form-btn">Verificar Código</button>
                    </div>
                    {status === 'failed' && <p className="error">{error}</p>}
                </form>
            )}
            {step === 3 && (
                <form onSubmit={handlePasswordSubmit}>
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
                        <button type="submit" className="btn form-btn">Alterar Senha</button>
                    </div>
                    {status === 'failed' && <p className="error">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default Recovery;