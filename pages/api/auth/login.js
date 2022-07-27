import db from '../../../db';
import bycrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { email, password } = req.body;
  const checkUser = await db('users').where({ email }).first();
  if (!checkUser) {
    return res.status(401).end();
  }
  const checkPassword = bycrpt.compareSync(password, checkUser.password);
  if (!checkPassword) {
    return res.status(405).json({
      message: 'Password salah',
    });
  }
  const token = jwt.sign(
    {
      id: checkUser.id,
      email: checkUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  res.status(200);
  res.json({
    message: 'Login Succesfully',
    token,
  });
}

export default handler;
