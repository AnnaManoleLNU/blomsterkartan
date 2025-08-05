import { put } from '@vercel/blob';
import { PassThrough } from 'stream';

export const config = {
  api: {
    bodyParser: false, // required to handle streams manually
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Limit the file size to 700KB
  const MAX_SIZE = 700 * 1024; // 700KB
  const { filename } = req.query;

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid filename' });
  }

  let uploadedSize = 0;
  const sizeLimitStream = new PassThrough();

  req.on('data', (chunk) => {
    uploadedSize += chunk.length;
    if (uploadedSize > MAX_SIZE) {
      req.destroy(); // stop the upload
      res.status(413).json({ error: 'File too large' });
    }
  });

  req.pipe(sizeLimitStream);

  try {
    const blob = await put(filename, sizeLimitStream, {
      access: 'public',
    });
    return res.status(200).json(blob);
  } catch (err) {
    return res.status(500).json({ error: 'Upload failed' });
  }
}
