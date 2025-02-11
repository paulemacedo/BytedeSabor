import mongoose from 'mongoose'

const AcompanhamentoSchema = new mongoose.Schema({
    _id: { type: String }, 
    nome: {type: String, required: true},
    imagem: {type: String},
    descricao: {type: String, required: false},
    preco: {type: Number, required: true},
    emEstoque: {type: Boolean}
    });
    
    const Acompanhamento = mongoose.model('Acompanhamento', AcompanhamentoSchema);
    export default Acompanhamento;