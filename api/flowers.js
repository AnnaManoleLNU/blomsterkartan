import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient().$extends(withAccelerate())

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const flowers = await prisma.flower.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(flowers)
  }

   if (req.method === 'POST') {
    try {
      // Read Bearer token -> decode userId
      const auth = req.headers.authorization || ''
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
      let userId

      if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET) // set JWT_SECRET
        userId = payload.sub || payload.userId || payload.id
      }

      const { name, location, notes, imageUrl } = req.body || {}
      if (!name || !location || !imageUrl || !userId) {
        return res.status(400).json({ error: 'Missing name, location, imageUrl, or userId (via token)' })
      }

      const newFlower = await prisma.flower.create({
        data: { name, location, notes: notes ?? null, imageUrl, userId },
      })
      return res.status(201).json(newFlower)
    } catch (err) {
      console.error('POST /flowers error:', err)
      return res.status(401).json({ error: 'Unauthorized or invalid token' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
