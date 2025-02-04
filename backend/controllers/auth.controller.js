import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';

const secretKey = process.env.JWT_SECRET;

export const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ success: true, token, user });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ success: false, message: "Server Error." });
    }
};