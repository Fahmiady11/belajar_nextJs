import db from '../../../db';
import bycrpt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  let { email, password } = req.body;
  const salt = bycrpt.genSaltSync(10);
  const passwordHash = bycrpt.hashSync(password, salt);

  const register = await db('users').insert({
    email,
    password: passwordHash,
  });
  
  const RegisteredUser = await db('users').where({ id: register }).first();

  res.status(200);
  res.json({
    message: 'Register succesfully',
    data: RegisteredUser,
  });
}
