import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ERROR_MESSAGES = {
  NO_TOKEN: 'No token provided!',
  INVALID_TOKEN: 'The token is invalid!',
};

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: ERROR_MESSAGES.NO_TOKEN });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }

  const authToken = tokenParts[1];

  jwt.verify(authToken, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
    }

    req.userId = decoded.id;
    next();
  });
};
