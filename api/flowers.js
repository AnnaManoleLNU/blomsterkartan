import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const flowers = await prisma.flower.findMany()
    return res.status(200).json(flowers)
  }

  if (req.method === 'POST') {
    const { name, location, imageUrl } = req.body
    const newFlower = await prisma.flower.create({
      data: { name, location, imageUrl },
    })
    return res.status(201).json(newFlower)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
