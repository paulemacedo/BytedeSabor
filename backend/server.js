import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import produtoRoutes from './routes/produto.route.js'
import pedidoRoutes from './routes/pedidos.route.js'
import Produto from './models/produto.model.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('app listening on port ' + PORT);
})