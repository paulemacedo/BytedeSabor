import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store';
import { loadUserFromStorage } from './redux/loginSlice';
import './Styles/index.css';

// Load user from local storage
store.dispatch(loadUserFromStorage());

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);