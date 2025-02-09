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
            setLocalError(error);
            const timer = setTimeout(() => {
                setLocalError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

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
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {localError && <p className="error-message">{localError}</p>}
                <div className="center-btn">
                    <button type="submit" className="btn form-btn" disabled={loading}>Login</button>
                </div>
                <div className="link-container">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;