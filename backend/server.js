import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import produtoRoutes from './routes/produto.route.js';
import pedidoRoutes from './routes/pedidos.route.js';
import usuarioRoutes from './routes/usuario.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const PORT = process.env.PORT || 3001; // Adicione um valor padrão para a porta
const app = express();

app.use(express.json());

// middleware
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('app listening on port ' + PORT);
  });
}).catch((error) => {
  console.error('Connection error', error.message);
});