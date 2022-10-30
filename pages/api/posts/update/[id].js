import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end();
  const auth = await authorization(req, res);

  const { id } = req.query;
  const { tittle, content } = req.body;
  const update = await db('posts').where({ id }).update({ tittle, content });

  const updatedData = await db('posts').where({ id }).first();
  res.status(200);
  res.json({
    message: 'Post Updated pak sukses',
    data: updatedData
  });
}