import Card from './Card.jsx'
import Produtos from '../back-end/Produtos.jsx'

const Catalogo = () => {
    return (
        <div class="container-fluid">
            <div class="row d-flex justify-content-center text-center">
                {Produtos.map((item) => (
                    <Card
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