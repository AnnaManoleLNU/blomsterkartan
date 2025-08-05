import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, useEffect } from "react";
import { PrismaClient } from '@prisma/client'

export default function About() {
  const prisma = new PrismaClient()

  const getUsers = async () => {
  const users = await prisma.user.findMany({
  where: {
    email: { endsWith: "prisma.io" }
  },
})

  console.log("Users with email ending in prisma.io: ", users);
  }

  useEffect(() => {
    getUsers().catch((error) => {
      console.error("Error fetching users: ", error);
    });
  }, []);



  const createUser = async () => {
    const newUser = await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@prisma.io",
      },
    });
    console.log("Created new user: ", newUser);
  };

  console.log("PRISMA", prisma);
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
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/upload?filename=${encodeURIComponent(file.name)}`,
            {
              method: "POST",
              body: file,
            }
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <Input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          required
        />
        <Button type="submit">Upload</Button>
        <Button type="button" onClick={createUser}>
          Create User Alice
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
