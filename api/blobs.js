import { list } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    const data = await list();
    res.status(200).json(data);
  } catch (err) {
    console.error('list() failed', err);
    res.status(500).json({ error: String(err) });
  }
}
