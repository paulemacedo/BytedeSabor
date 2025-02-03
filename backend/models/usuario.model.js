import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String},
    role: {type: String, required: true, enum: ['admin', 'user']}
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;