import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';

const generateHexId = () => {
    return [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-senha'); // Exclui o campo 'senha' da resposta
        res.status(200).json({ success: true, data: usuarios });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// CRIAR USER, OK
export const criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: "Fields missing." });
    }

    try {
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use." });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUsuario = new Usuario({ _id: generateHexId(), nome, email, senha: hashedPassword, isAdmin: false });
        await newUsuario.save();
        res.status(201).json({ success: true, message: "Usuario added." });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ success: false, message: "Server Error." });
    }
};

export const verUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        res.status(200).json({ success: true, data: usuario });
    } catch (error) {
        res.status(404).json({ success: false, message: "Usuario não encontrado" });
    }
};

export const atualizarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    const usuarioAtualizado = req.body;
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, usuarioAtualizado, { new: true });
        res.status(200).json({ success: true, user: usuario });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETAR USER, OK
export const deletarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        await Usuario.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'Usuario deletado' });
    } catch (error) {
        console.error("Erro: ", error.message);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};