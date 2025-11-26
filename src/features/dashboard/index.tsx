import { Button } from "@/components/ui/button";
import {
  //useGetBlobsQuery,
  useUploadBlobMutation,
} from "../../../redux/blobsApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  useGetFlowersQuery,
  useAddFlowerMutation,
  type Flower,
} from "../../../redux/flowersApi";

export default function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const { data: flowers } = useGetFlowersQuery();
  const [addFlower] = useAddFlowerMutation();
  const [uploadBlob] = useUploadBlobMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name"))
    const location = String(fd.get("location"))
    const notes = String(fd.get("notes")) || undefined;

    if (!pictureFile) {
      console.warn("No picture selected");
      return;
    }

    try {
      const uploadRes = await uploadBlob({
        file: pictureFile,
        filename: pictureFile.name,
      }).unwrap();

      const imageUrl = uploadRes?.url;
      if (!imageUrl) throw new Error("Upload response missing image URL");

      await addFlower({ name, location, notes, imageUrl }).unwrap();

      setIsDialogOpen(false);
      setPictureFile(null);
      form.reset(); // use the cached form
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <>
      <p>Welcome User!</p>
      <p>Your Flowers</p>
      <div className="flex gap-2">
        <div className="flex gap-2">
          {flowers?.map((f: Flower) => (
            <img
              key={f.id}
              src={f.imageUrl}
              alt={f.name}
              className="w-52 rounded-2xl"
            />
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {/* Important: not a submit button */}
          <Button type="button">Add Flower</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Add Flower</DialogTitle>
              <DialogDescription>
                Upload a new flower here. Click add when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="Rose, Daisy etc..."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="location-1">Location</Label>
                <Input
                  id="location-1"
                  name="location"
                  placeholder="Stockholm, Göteborg etc..."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="notes-1">Notes</Label>
                <Textarea
                  id="notes-1"
                  name="notes"
                  placeholder="Add any notes about this entry..."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setPictureFile(file);
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Flower</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
