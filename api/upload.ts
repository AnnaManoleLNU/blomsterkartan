// api/upload.ts
import { put } from '@vercel/blob';
import { type VercelRequest, type VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { filename } = req.query;

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid filename' });
  }

  const blob = await put(filename, req, {
    access: 'public',
  });

  return res.status(200).json(blob);
}
