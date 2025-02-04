import mongoose from 'mongoose'

const AcompanhamentoSchema = new mongoose.Schema({
    _id: { type: String }, // Defina explicitamente o _id como String
    tipo: {type: String},
    nome: {type: String, required: true},
    imagem: {type: String},
    descricao: {type: String, required: false},
    preco: {type: Number, required: true},
    emEstoque: {type: Boolean}
    });
    
    const Acompanhamento = mongoose.model('Acompanhamento', AcompanhamentoSchema);
    export default Acompanhamento;