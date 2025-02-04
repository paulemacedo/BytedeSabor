import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Toppings.css';

// Defina o elemento do aplicativo para o modal
Modal.setAppElement('#root');

const Toppings = ({
  isOpen,
  onRequestClose,
  acompanhamentos = [],
  onSelectTopping,
  onConfirm
}) => {
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    console.log('Acompanhamentos:', acompanhamentos);
  }, [acompanhamentos]);

  const handleSelectTopping = (topping) => {
    const isSelected = selectedToppings.includes(topping);
    if (isSelected) {
      setSelectedToppings(selectedToppings.filter(t => t._id !== topping._id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
    onSelectTopping(topping, !isSelected);
  };

  const gratuitos = Array.isArray(acompanhamentos)
    ? acompanhamentos.filter(t => t.preco === 0)
    : [];
  const comAcrescimo = Array.isArray(acompanhamentos)
    ? acompanhamentos.filter(t => t.preco > 0)
    : [];

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
            <li key={topping._id}>
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
          {comAcrescimo.map((topping) => (
            <li key={topping._id}>
              <label className="topping-label">
                {topping.nome} (R$ {topping.preco})
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
        <button onClick={() => onConfirm(selectedToppings)} className="btn">Confirmar</button>
      </div>
    </Modal>
  );
};

export default Toppings;