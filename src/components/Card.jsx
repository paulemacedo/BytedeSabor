import 'bootstrap-icons/font/bootstrap-icons.css';
import './Card.css';

const Card = ({ nome, imagem, descricao, preco }) => {
    return (
        <div className="card-container">
            <img className="card-image" src={imagem} alt={nome} />
            <div className="card-content">
                <h2 className="card-title">{nome}</h2>
                <p className="card-description">{descricao}</p>
                <p className="card-price">{preco}</p>
                <a className="card-link btn" href="#">
                    <i className="bi bi-cart"></i> Adicionar ao carrinho
                </a>
            </div>
        </div>
    );
};

export default Card;