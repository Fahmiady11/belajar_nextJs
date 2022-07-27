import jwt from 'jsonwebtoken';

export default function authorization(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).end();
  }
  const authSplit = authorization.split(' ');
  const [authType, authToken] = authSplit;
  if (authType !== 'Bearer') {
    return res.status(401).end();
  }

  try {
    return jwt.verify(authToken, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).end();
  }
}
