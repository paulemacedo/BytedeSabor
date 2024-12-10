const Card = ({ nome, imagem, descricao, preco }) => {
    return (
        <div class="col m-4">
            <img class="rounded" src={imagem} alt={nome} />
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <p>{preco}</p>
            <a href="#"> Adicionar ao carrinho </a>
        </div>
    );
};

export default Card;