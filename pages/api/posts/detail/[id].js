import db from '../../../../db';
import authorization from '../../../../middleware/authorization';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Post Detail error',
    });
  }
  const { id } = req.query;
  await authorization(req, res);
  const posts = await db('posts').where('id', id).first();
  res.status(200);
  res.json({
    message: 'Post Detail succesfully',
    data: posts,
  });
}
