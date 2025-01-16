import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Produtos from '../back-end/Produtos.jsx';  // Adicionado o import
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/theme.css';  // Novo import
import '../Styles/index.css';
import '../Styles/Catalogo.css';  // Certifique-se que este é o último


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
                    <Swiper
                        className="swiper-container"
                        spaceBetween={20}
                        slidesPerView={1.2} // Ajuste para mostrar parcialmente o próximo slide
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
                                            className="btn btn:hover flex-container" 
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
        </div>
    );
};

export default Catalogo;