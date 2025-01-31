import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import produtoRoutes from './routes/produto.route.js'

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/api/produtos', produtoRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('app listening on port ' + PORT);
})