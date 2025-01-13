import Card from './Card.jsx'
import Produtos from '../back-end/Produtos.jsx'
import './Catalogo.css'

const Catalogo = () => {
    return (
        <div className="catalogo-container">
            <div className="card-grid">
                {Produtos.map((item, index) => (
                    <Card
                        key={index}
                        imagem={item.imagem}
                        nome={item.nome}
                        descricao={item.descricao}
                        preco={item.preco}
                    />
                ))}
            </div>
        </div>
    )
};

export default Catalogo;