import React from 'react';
import Card from './Card.jsx';
import Produtos from '../back-end/Produtos.jsx';
import { addToCart } from '../back-end/CartManager.jsx';
import './Catalogo.css';

const Catalogo = () => {
    const handleAddToCart = (product) => {
        addToCart(product);
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