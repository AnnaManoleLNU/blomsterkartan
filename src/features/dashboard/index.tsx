import { Button } from "@/components/ui/button";
import { useGetBlobsQuery } from "../../../redux/blobsApi";
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

export default function Dashboard() {
  const { data } = useGetBlobsQuery();
  return (
    <>
      <p>Welcome User!</p>
      <p>Your Flowers</p>
      <div className="flex gap-2">
        {data?.map((blob) => (
          <img key={blob.url} src={blob.url} className="w-52 rounded-2xl" />
        ))}
      </div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>Add Flower</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Flower </DialogTitle>
              <DialogDescription>
                Upload a new flower here. Click add when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" placeholder="Rose, Daisy etc..."  />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="location-1">Location</Label>
                <Input id="location-1" name="location" placeholder="Stockholm, Göteborg etc..." />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="notes-1">Notes</Label>
                <Textarea id="notes-1" name="notes" placeholder="Add any notes about this entry..." />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file"></Input>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Flower</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
