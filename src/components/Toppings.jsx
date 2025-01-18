import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Toppings.css';
import Acompanhamentos from '../back-end/Acompanhamentos';

// Defina o elemento do aplicativo para o modal
Modal.setAppElement('#root');

const Toppings = ({ isOpen, onRequestClose, onSelectTopping, onConfirm }) => {
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

  const gratuitos = Acompanhamentos.filter(topping => topping.preco === 0);
  const comAcrescimo = Acompanhamentos.filter(topping => topping.preco > 0);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select Toppings"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Selecione os acompanhamentos</h2>
        <button onClick={onRequestClose}><i className="bi bi-x"></i></button>
      </div>
      <div className="modal-body">
        <ul>
          {gratuitos.map((topping) => (
            <li key={topping.nome}>
              <label className="topping-label">
                {topping.nome}
                <i
                  className={`bi ${selectedToppings.includes(topping) ? 'bi-dash-circle' : 'bi-plus-circle'}`}
                  style={{ marginLeft: 'auto', cursor: 'pointer' }}
                  onClick={() => handleSelectTopping(topping)}
                ></i>
              </label>
            </li>
          ))}
        </ul>
        <ul>
          {comAcrescimo.map((topping) => (
            <li key={topping.nome}>
              <label className="topping-label">
                {topping.nome} - R$ {topping.preco.toFixed(2)}
                <i
                  className={`bi ${selectedToppings.includes(topping) ? 'bi-dash-circle' : 'bi-plus-circle'}`}
                  style={{ marginLeft: 'auto', cursor: 'pointer' }}
                  onClick={() => handleSelectTopping(topping)}
                ></i>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="modal-footer">
        <button onClick={() => { onConfirm(selectedToppings); setSelectedToppings([]); }} className="btn">Confirmar</button>
      </div>
    </Modal>
  );
};

export default Toppings;