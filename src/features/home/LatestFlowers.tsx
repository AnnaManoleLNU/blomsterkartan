import { useEffect, useState } from "react";

type Blob = {
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  url: string;
};

export default function LatestFlowers() {
  const [latestFlowers, setLatestFlowers] = useState<null | Blob[]>(null);

  useEffect(() => {
    const getLatestBlobs = async () => {
      const response = await fetch("/api/blobs");
      const json = await response.json();
      const latestFlowers = json.blobs.sort(
        (a: Blob, b: Blob) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
      setLatestFlowers(latestFlowers);
    };

    getLatestBlobs();
  }, []);

  if (!latestFlowers || latestFlowers.length === 0)
    return <>No latest flowers available!</>;

  return (
    <>
      <h1>Latest Flowers</h1>
      <div className="flex gap-2">
      {latestFlowers.map((flower: Blob) => {
        return (

            <img
              src={flower.url}
              alt={flower.pathname}
              className="w-52 rounded-xl"
            />
        );
      })}
      </div>
    </>
  );
}
