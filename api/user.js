import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient().$extends(withAccelerate())

export default async function handler(req, res) {
  const id = req.query 

  if (!id) {
    res.status(400).json({ error: 'Missing id' })
  }
  if (req.method === 'GET') {
    const id = req.query
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return res.status(200).json(user)
  }
  return res.status(501).json({ error: 'Not implemented' })
}