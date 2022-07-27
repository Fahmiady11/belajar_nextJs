import db from '../../../../db';
import authorization from '../../../../middleware/authorization';
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }
  await authorization(req, res);
  let { id } = req.query;
  let { title, content } = req.body;
  await db('posts').where({ id }).update({
    title,
    content,
  });
  const update = await db('posts').where({ id }).first();
  res.status(200);
  res.json({
    message: 'update succesfully',
    data: update,
  });
}
