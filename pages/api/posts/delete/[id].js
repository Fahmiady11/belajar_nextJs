import db from '../../../../db';
import authorization from '../../../../middleware/authorization';
export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }
  await authorization(req, res);
  let { id } = req.query;
  await db('posts').where({ id }).del();

  const deleted = await db('posts').where({ id }).first();
  res.status(200);
  res.json({
    message: 'delete succesfully',
    data: deleted,
  });
}
