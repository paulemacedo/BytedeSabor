import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';

const secretKey = process.env.JWT_SECRET;

export const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email ou senha inválidos." });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Email ou senha inválidos." });
        }

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });
        
        const userWithoutPassword = {
            _id: user._id,
            nome: user.nome,
            email: user.email,
            foto: user.foto,
            endereco: user.endereco,
            isAdmin: user.isAdmin
        };

        res.status(200).json({ success: true, token, user: userWithoutPassword });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};