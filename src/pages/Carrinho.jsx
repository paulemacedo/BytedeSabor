import React, { useEffect, useState } from 'react';
import { getCartItems, clearCart, getTotalPrice } from '../back-end/CartManager.jsx';
import './Carrinho.css';

const Carrinho = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = getCartItems();
        setCart(storedCart);
        setTotalPrice(getTotalPrice());
    }, []);

    const handleCheckout = () => {
        alert('Pedido finalizado com sucesso!');
        clearCart();
        setCart([]);
        setTotalPrice(0);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-purple">Meu Carrinho</h1>
            <div id="cart-items">
                {cart.length === 0 ? (
                    <p className="text-white">Seu carrinho está vazio.</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img src={item.imagem} className="img-fluid rounded-start" alt={item.nome} />
                                </div>
                                <div className="col-md-10">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.nome}</h5>
                                        <p className="card-text">{item.descricao}</p>
                                        <p className="card-text text-white">Preço: R$ {item.preco.toFixed(2)}</p>
                                        <p className="card-text text-white">Quantidade: {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="mt-4">
                    <h3>Total: R$ <span id="total-price">{totalPrice}</span></h3>
                    <button className="btn btn-success mt-2" onClick={handleCheckout}>Finalizar Pedido</button>
                </div>
            )}
        </div>
    );
};

export default Carrinho;