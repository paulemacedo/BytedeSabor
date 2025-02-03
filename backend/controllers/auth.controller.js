import Usuario from '../models/usuario.model.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const login = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({email});
    if(usuario) {
        const isMatch = await bcrypt.compare(senha, usuario.senha);

        if(!isMatch) {
            res.status(401).json({
                success: false,
                message: "Usuario ou senha incorretos."
            })
        } else {
            const token = jsonwebtoken.sign(
                {id:usuario._id, role: usuario.role},
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            res.status(200).json({ token });
        }
    } else {
        res.status(401).json({
            success: false,
            message: "Usuario ou senha incorretos."
        })
    }
};