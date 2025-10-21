import { list, del } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await list();
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      // Provide a base URL so Node's URL parser is happy in dev
      const base = `http://${req.headers.host}`;
      const { searchParams } = new URL(req.url, base);

      const urlToDelete = searchParams.get("url");
      if (!urlToDelete) {
        return res.status(400).json({ error: "Missing ?url=…" });
      }

      await del(urlToDelete);
      return res.status(204).end();
    }

    // Method not allowed
    res.setHeader("Allow", "GET, DELETE");
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    console.error("blobs handler failed", err);
    return res.status(500).json({ error: String(err) });
  }
}
