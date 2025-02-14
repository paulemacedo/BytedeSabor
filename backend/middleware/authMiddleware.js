import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

const secretKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
        /* console.log("auth: ", req.header('Authorization'), "\n token: ", token) */

    if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid Token' });
    }
};

export const verifyAdmin = async (req, res, next) => {
    try {
        const user = await Usuario.findById(req.user._id);
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403).json({ success: false, message: 'Access Denied' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};