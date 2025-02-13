const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction ? 'https://bytedesabor-backend.vercel.app/api' : 'http://localhost:3001/api';