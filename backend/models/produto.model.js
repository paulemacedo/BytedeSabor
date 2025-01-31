import mongoose from 'mongoose'

const ProdutoSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    tipo: {type: String, required: true},
    nome: {type: String, required: true},
    imagem: {type: String, required: true},
    descricao: {type: String, required: false},
    preco: {type: Number, required: true},
    emEstoque: {type: Boolean}
});

const Produto = mongoose.model('Produto', ProdutoSchema);
export default Produto;