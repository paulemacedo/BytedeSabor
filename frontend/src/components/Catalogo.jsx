import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProdutos, fetchAcompanhamentos, selectAllProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';
import Toppings from './Toppings'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../Styles/index.css';
import '../Styles/Catalogo.css';

const Catalogo = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts) || [];
  const [isToppingsModalOpen, setIsToppingsModalOpen] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProdutos());
    dispatch(fetchAcompanhamentos());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('Products:', products); // Adicione este log
  }, [products]);

  const handleAddToCart = (product) => {
    if (product.tipo === 'açai') {
      setCurrentProduct(product);
      setIsToppingsModalOpen(true);
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleSelectTopping = (topping, isSelected) => {
    if (isSelected) {
      setSelectedToppings([...selectedToppings, topping]);
    } else {
      setSelectedToppings(selectedToppings.filter(item => item.id !== topping.id));
    }
  };

  const handleConfirmToppings = () => {
    const productWithToppings = {
      ...currentProduct,
      toppings: selectedToppings
    };
    dispatch(addToCart(productWithToppings));
    setIsToppingsModalOpen(false);
    setSelectedToppings([]);
  };

  const groupedProducts = Array.isArray(products) ? products.reduce((acc, product) => {
    if (!acc[product.tipo]) {
      acc[product.tipo] = [];
    }
    acc[product.tipo].push(product);
    return acc;
  }, {}) : {};

  return (
    <div className="catalogo-container">
      {Object.keys(groupedProducts).map((tipo, index) => (
        <div className="product-type-section" key={index}>
          <h1>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>
          <Swiper
            className="swiper-container"
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              320: {
                slidesPerView: 1.1,
                spaceBetween: 20
              },
              589: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1174: {
                slidesPerView: 3.2,
                spaceBetween: 20
              }
            }}
          >
            {groupedProducts[tipo].map((item, index) => (
              <SwiperSlide key={index}>
                <div className="card-container">
                  <img className="card-image" src={item.imagem} alt={item.nome} />
                  <div className="card-content">
                    <h2 className="card-title">{item.nome}</h2>
                    <p className="card-description">{item.descricao}</p>
                    <a 
                      className="btn flex-container" 
                      onClick={() => handleAddToCart(item)}
                    >
                      <span id='cardPlus'>+</span>
                      <i className="bi bi-cart"></i>
                      <p className="card-price">R$ {item.preco.toFixed(2)}</p>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
      <Toppings
        isOpen={isToppingsModalOpen}
        onRequestClose={() => setIsToppingsModalOpen(false)}
        onSelectTopping={handleSelectTopping}
        onConfirm={handleConfirmToppings}
      />
    </div>
  );
};

export default Catalogo;