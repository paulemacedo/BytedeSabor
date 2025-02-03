import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { selectAllAcompanhamentos } from '../redux/productsSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Toppings.css';

// Defina o elemento do aplicativo para o modal
Modal.setAppElement('#root');

const Toppings = ({ isOpen, onRequestClose, onSelectTopping, onConfirm }) => {
  const acompanhamentos = useSelector(selectAllAcompanhamentos) || [];
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedToppings([]);
    }
  }, [isOpen]);

  const handleSelectTopping = (topping) => {
    const isSelected = selectedToppings.includes(topping);
    if (isSelected) {
      setSelectedToppings(selectedToppings.filter(t => t.nome !== topping.nome));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
    onSelectTopping(topping, !isSelected);
  };

  const gratuitos = Array.isArray(acompanhamentos) ? acompanhamentos.filter(topping => topping.preco === 0) : [];
  const comAcrescimo = Array.isArray(acompanhamentos) ? acompanhamentos.filter(topping => topping.preco > 0) : [];

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Selecione os Toppings</h2>
      <div className="toppings-container">
        <h3>Gratuitos</h3>
        {gratuitos.map((topping) => (
          <div key={topping.id} className="topping-item">
            <img src={topping.imagem} alt={topping.nome} />
            <p>{topping.nome}</p>
            <button onClick={() => handleSelectTopping(topping)}>
              {selectedToppings.includes(topping) ? 'Remover' : 'Adicionar'}
            </button>
          </div>
        ))}
        <h3>Com Acréscimo</h3>
        {comAcrescimo.map((topping) => (
          <div key={topping.id} className="topping-item">
            <img src={topping.imagem} alt={topping.nome} />
            <p>{topping.nome}</p>
            <p>R$ {topping.preco.toFixed(2)}</p>
            <button onClick={() => handleSelectTopping(topping)}>
              {selectedToppings.includes(topping) ? 'Remover' : 'Adicionar'}
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => onConfirm(selectedToppings)}>Confirmar</button>
    </Modal>
  );
};

export default Toppings;