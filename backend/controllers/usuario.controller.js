import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';


// CRIAR USER, OK
export const criarUsuario = async (req, res) => {
    const usuario = req.body;
    if(!usuario.nome || !usuario.email || !usuario.senha) {
        return res.status(400).json({ success:false, message:"Fields missing." })
    }
    const newUsuario = new Usuario(usuario)
    newUsuario.senha = await bcrypt.hash(usuario.senha, 10);
    try {
        await newUsuario.save();
        res.status(201).json({ success: true, message: "Usuario added." });
    } catch(error) {
        console.error("Error: ", error.message);
        res.status(500).json({ success: false, message: "Server Error." })
    }
}

// READ USER POR ID, OK
export const verUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarios = await Usuario.findById(id)
        res.status(201).json({ success: true, data: usuarios})
    } catch (error) {
        res.status(201).json({
            message: "usuario nao encontrado"
        })
    }
}

export const atualizarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    const usuarioAtualizado = req.body;
    // await Usuario.findByIdAndUpdate()
}

// DELETAR USER, OK
export const deletarUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        await Usuario.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'usuario deletado'})
    } catch (error) {
        console.error("Erro: ", error.message);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}