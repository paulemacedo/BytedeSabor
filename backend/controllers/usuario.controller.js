import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';

const generateHexId = () => {
    return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-senha'); // Exclui o campo 'senha' da resposta
        res.status(200).json({ success: true, data: usuarios });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};

export const criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        const missingFields = [];
        if (!nome) missingFields.push('nome');
        if (!email) missingFields.push('email');
        if (!senha) missingFields.push('senha');
        return res.status(400).json({ success: false, message: `Campos faltando: ${missingFields.join(', ')}.` });
    }

    try {
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email já está em uso." });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUsuario = new Usuario({ _id: generateHexId(), nome, email, senha: hashedPassword, isAdmin: false });
        await newUsuario.save();
        res.status(201).json({ success: true, message: "Usuário adicionado." });
    } catch (error) {
        console.error("Erro: ", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};

export const verUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        res.status(200).json({ success: true, data: usuario });
    } catch (error) {
        res.status(404).json({ success: false, message: "Usuário não encontrado." });
    }
};

export const atualizarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    const usuarioAtualizado = req.body;
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, usuarioAtualizado, { new: true });
        res.status(200).json({ success: true, user: usuario });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};

export const deletarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        await Usuario.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'Usuário deletado.' });
    } catch (error) {
        console.error("Erro: ", error.message);
        res.status(401).json({
            success: false,
            message: "Erro no servidor."
        });
    }
};

export const checkEmailExists = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (user) {
            return res.status(200).json({ success: true, message: "Email existe." });
        } else {
            return res.status(404).json({ success: false, message: "Email não encontrado." });
        }
    } catch (error) {
        console.error("Erro durante a verificação do email:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};

export const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Email não encontrado." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.senha = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Senha atualizada com sucesso." });
    } catch (error) {
        console.error("Erro durante a atualização da senha:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};