import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Card.css';

const Card = ({ nome, imagem, descricao, preco, onAddToCart }) => {
    return (
        <div className="card-container">
            <img className="card-image" src={imagem} alt={nome} />
            <div className="card-content">
                <h2 className="card-title">{nome}</h2>
                <p className="card-description">{descricao}</p>
                <p className="card-price">R$ {preco.toFixed(2)}</p>
                <button className="card-link btn" onClick={onAddToCart}>
                    <i className="bi bi-cart"></i> Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
};

export default Card;