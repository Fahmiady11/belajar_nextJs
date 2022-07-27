import db from '../../../db';
import authorization from '../../../middleware/authorization';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Post error',
    });
  }
  await authorization(req, res);
  const posts = await db('posts');
  res.status(200);
  res.json({
    message: 'Post succesfully',
    data: posts,
  });
}
