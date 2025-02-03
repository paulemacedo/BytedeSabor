import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import produtoRoutes from './routes/produto.route.js'
import pedidoRoutes from './routes/pedidos.route.js'
import usuarioRoutes from './routes/usuario.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

// middleware
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('app listening on port ' + PORT);
})