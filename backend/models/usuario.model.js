import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    foto: { type: String, default: 'profilePicture.jpg' },
    endereco: { type: String },
    senha: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;