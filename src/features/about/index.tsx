import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { useUploadBlobMutation } from "../../../redux/blobsApi";

export default function About() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const [uploadBlob, { isLoading, isError }] = useUploadBlobMutation();

  const createFlower = async (
    name: string,
    location: string,
    imageUrl: string
  ) => {
    const response = await fetch("/api/flowers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location, imageUrl }),
    });
    if (!response.ok) throw new Error("Failed to create flower");
    const flower = await response.json();
    console.log("Created flower:", flower);
  };

  const submitPicture = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = inputFileRef.current?.files?.[0];
    if (!file) throw new Error("No file selected");

    // Build FormData to match the RTK Query mutation definition
    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const file = inputFileRef.current?.files?.[0];
      if (!file) throw new Error("No file selected");
      const newBlob = await uploadBlob({ file, filename: file.name }).unwrap();

      setBlob(newBlob);
    } catch (e) {
      console.error("Upload failed:", e);
    }
  };

  return (
    <>
      <h1>Upload Picture Test</h1>
      <p>Select a picture file to upload.</p>

      <form onSubmit={submitPicture}>
        <Input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          required
          disabled={isLoading}
        />
        <div className="flex gap-2 mt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading…" : "Upload"}
          </Button>
          <Button
            type="button"
            onClick={() => createFlower("Rose", "Garden", "test")}
            disabled={isLoading}
          >
            Create Flower
          </Button>
        </div>
      </form>

      {isError && (
        <p className="text-sm text-red-600 mt-2">
          Upload failed
        </p>
      )}

      {blob && (
        <div className="mt-4">
          Blob url:{" "}
          <a href={blob.url} target="_blank" rel="noreferrer">
            {blob.url}
          </a>
        </div>
      )}
    </>
  );
}
