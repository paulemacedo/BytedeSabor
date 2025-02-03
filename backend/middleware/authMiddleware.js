import jsonwebtoken from "jsonwebtoken"

const secret = process.env.SECRET;

async function verifyToken(req, res, next) {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      console.error ('sem token');
      return res.status(401).json({ message: 'nao autorizado' });
    }

    const verified = jsonwebtoken.verify(token.split("")[1], secret);
    req.usuario = verified;
    next();
  } catch (error) {
    console.error (error);
    res.status(400).json({ message: 'token invalido' });
  }
}

export { verifyToken };