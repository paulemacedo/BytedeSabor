import React from 'react';
import Produtos from '../back-end/Produtos.jsx';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Catalogo.css';
import '../Styles/index.css';

const Catalogo = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const groupedProducts = Produtos.reduce((acc, product) => {
        if (!acc[product.tipo]) {
            acc[product.tipo] = [];
        }
        acc[product.tipo].push(product);
        return acc;
    }, {});

    return (
        <div className="catalogo-container">
            {Object.keys(groupedProducts).map((tipo, index) => (
                <div className="product-type-section" key={index}>
                    <h1>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>
                    <div className="card-grid">
                        {groupedProducts[tipo].map((item, index) => (
                            <div className="card-container" key={index}>
                                <img className="card-image" src={item.imagem} alt={item.nome} />
                                <div className="card-content">
                                    <h2 className="card-title">{item.nome}</h2>
                                    <p className="card-description">{item.descricao}</p>
                                    <p className="card-price">R$ {item.preco.toFixed(2)}</p>
                                    <button className="btn" onClick={() => handleAddToCart(item)}>
                                        <i className="bi bi-cart"></i> Adicionar ao carrinho
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Catalogo;