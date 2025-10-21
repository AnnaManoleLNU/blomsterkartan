import { list, put, del } from "@vercel/blob";
import { PassThrough } from "stream";

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

    if (req.method === "POST") {
      const base = `http://${req.headers.host}`;
      const { searchParams } = new URL(req.url, base);
      const filename = searchParams.get("filename");

      if (!filename || typeof filename !== "string") {
        return res.status(400).json({ error: "Missing or invalid ?filename=" });
      }

      //  Only allow image uploads
      const reqType =
        (req.headers["content-type"] && String(req.headers["content-type"]).split(";")[0]) ||
        "";
      const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
      if (!allowedTypes.has(reqType)) {
        return res
          .status(415)
          .json({ error: "Only image files are allowed (jpeg, png, webp)." });
      }

      const MAX_SIZE = 700 * 1024; // 700KB
      let uploadedSize = 0;
      let aborted = false;

      const sizeLimitStream = new PassThrough();

      req.on("data", (chunk) => {
        uploadedSize += chunk.length;
        if (uploadedSize > MAX_SIZE && !aborted) {
          aborted = true;
          // Stop reading more data and respond
          try {
            req.destroy(); // abort upstream
          } catch {}
          if (!res.headersSent) {
            res.status(413).json({ error: "File too large, max 700KB." });
          }
        }
      });

      req.on("error", () => {
        if (!res.headersSent) {
          res.status(400).json({ error: "Upload stream error." });
        }
      });

      // Pipe the request to our pass-through stream (unless already aborted)
      if (!aborted) req.pipe(sizeLimitStream);

      if (aborted) {
        // We already responded 413 above
        return;
      }

      try {
        const contentType =
          (req.headers["content-type"] && String(req.headers["content-type"])) ||
          "application/octet-stream";

        const blob = await put(filename, sizeLimitStream, {
          access: "public",
          addRandomSuffix: true,
          contentType,
        });

        return res.status(200).json(blob);
      } catch (err) {
        // If the stream was destroyed due to size, we've already replied
        if (!res.headersSent) {
          return res.status(500).json({ error: "Upload failed" });
        }
        return;
      }
    }

    // Method not allowed
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    console.error("blobs handler failed", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: String(err) });
    }
  }
}
