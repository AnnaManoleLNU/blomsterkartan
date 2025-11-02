import { User, LocateIcon, Clock } from "lucide-react";
import { useGetBlobsQuery } from "../../../redux/blobsApi";

export default function LatestFlowers() {
  const { data: flowers, isLoading, isError, isFetching } = useGetBlobsQuery();

  if (isLoading) {
    return (
      <>
        <h1>Latest Flowers</h1>
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-52 h-36 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </>
    );
  }

  if (isError || !flowers || flowers.length === 0) {
    return <>No latest flowers available!</>;
  }

  const test = {
    name: "Anna",
    location: "Stockholm",
    time: "10:00 AM",
  };

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      {/* <div className="mb-10 text-center">
      <h1 className="text-5xl font-bold text-center  uppercase">Latest Flowers</h1>
      <p className="text-sm text-gray-500">Check out the latest flowers added to our collection</p>
      </div> */}
      {isFetching && <p className="text-sm text-blue">Refreshing…</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {flowers.map((f) => (
          <div className="flex flex-col items-center  bg-blue/20 p-4">
            <img
              key={f.pathname}
              src={f.url}
              alt={f.pathname}
              className="object-center object-cover w-90 h-90"
              loading="lazy"
            />
            <div className="h-10 mt-4 text-sm flex gap-2 items-center">
              <User className="h-4 w-4 text-blue" /> {test.name}
              <LocateIcon className="h-4 w-4 text-blue" /> {test.location}
              <Clock className="h-4 w-4 text-blue" /> {test.time}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4">Our latest flowers</p>
      <div className="bg-blue h-[1px] w-full "></div>
    </div>
  );
}
