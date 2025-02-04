import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
    _id: { type: String }, // Defina explicitamente o _id como String
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String},
    isAdmin: {type: Boolean, required: true}
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;