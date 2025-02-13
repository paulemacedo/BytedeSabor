import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Byte de Sabor API',
      version: '1.0.0',
      description: 'Documentação da API REST do Byte de Sabor',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
      {
        url: 'https://bytedesabor-backend.vercel.app/api',
      },
      {
        url: 'https://bytedesabor-backend-git-develop-react-paulemacedos-projects.vercel.app/api',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

router.use('', swaggerUi.serve, swaggerUi.setup(specs));

export default router;