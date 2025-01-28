const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    id : {
        type: Number,
        require: true,
        unique: true,
    },
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
    },
    preco: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Produto', produtoSchema);