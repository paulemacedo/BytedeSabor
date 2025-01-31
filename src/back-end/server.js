import express from 'express';
import 'dotenv/config';
import {dbConnect} from './db/dbConnect.js';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    dbConnect();
    console.log('app listening on port ' + PORT);
});