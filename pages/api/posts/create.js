import db from '../../../db';
import authorization from '../../../middleware/authorization';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  await authorization(req, res);
  const { title, content } = req.body;
  const create = await db('posts').insert({
    title,
    content,
  });
  const createdData = await db('posts').where('id', create).first();
  res.status(200);
  res.json({
    message: 'Post created succesfully',
    data: createdData,
  });
}
