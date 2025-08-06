import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";

export default function About() {
  const createFlower = async (
    name: string,
    location: string,
    imageUrl: string
  ) => {
    const response = await fetch("/api/flowers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, location, imageUrl }),
    });
    if (!response.ok) {
      throw new Error("Failed to create flower");
    }
    const flower = await response.json();
    console.log("Created flower:", flower);
  };

  const submitPicture = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    //const BASE_URL = import.meta.env.VITE_BASE_URL;


    const response = await fetch(
      `/api/upload?filename=${encodeURIComponent(file.name)}`,
      {
        method: "POST",
        body: file,
      }
    );
    console.log("Response status:", response.status);

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
  };
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Picture Test</h1>
      <p>
        This is a test page for uploading pictures. Please select a picture file
        to upload.
      </p>

      <form
        onSubmit={submitPicture}
      >
        <Input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          required
        />
        <Button type="submit">Upload</Button>
        <Button
          type="button"
          onClick={() => {
            createFlower("Rose", "Garden", "test");
          }}
        >
          Create Flower
        </Button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
