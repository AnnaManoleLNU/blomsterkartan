import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, email, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password || typeof password !== "string") {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser)
      return res.status(400).json({ error: "Email or username already exists." });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashed },
    });

    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
