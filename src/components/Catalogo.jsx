import React from 'react';
import { useDispatch } from 'react-redux';
import Card from './Card.jsx';
import Produtos from '../back-end/Produtos.jsx';
import { addToCart } from '../redux/cartSlice';
import './Catalogo.css';

const Catalogo = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="catalogo-container">
            <div className="card-grid">
                {Produtos.map((item, index) => (
                    <Card
                        key={index}
                        nome={item.nome}
                        imagem={item.imagem}
                        descricao={item.descricao}
                        preco={item.preco}
                        onAddToCart={() => handleAddToCart(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Catalogo;