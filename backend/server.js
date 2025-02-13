import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import produtoRoutes from './routes/produto.route.js';
import pedidoRoutes from './routes/pedidos.route.js';
import usuarioRoutes from './routes/usuario.route.js';
import acompanhamentoRoutes from './routes/acompanhamento.route.js';
import authRoutes from './routes/auth.route.js';
import swaggerRoutes from './config/swagger.js';

dotenv.config();

const PORT = process.env.PORT || 3001; // Adicione um valor padrão para a porta
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173', 
      'https://bytedesabor.vercel.app', 
      'https://bytedesabor-git-develop-react-paulemacedos-projects.vercel.app'
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  })
);

app.use(express.json());

app.use('/api-docs', swaggerRoutes);

// middleware
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/acompanhamentos', acompanhamentoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('app listening on port ' + PORT);
  });
}).catch((error) => {
  console.error('Connection error', error.message);
});