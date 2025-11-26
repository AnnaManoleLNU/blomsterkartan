import { User, LocateIcon, Clock } from "lucide-react";
import { useGetFlowersQuery } from "../../../redux/flowersApi";
//import {useGetUserQuery} from "../../../redux/userApi";

export default function LatestFlowers() {
  const {
    data: flowers,
    isLoading,
    isError,
    isFetching,
  } = useGetFlowersQuery();

  console.log(flowers?.[0]?.userId)
  // const { data: user} = useGetUserQuery(flowers?.[0]?.userId || "");
  // console.log("the user", user);

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

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      {isFetching && <p className="text-sm text-blue">Refreshing…</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {flowers.map((f) => (
          <div className="flex flex-col items-center  bg-blue/20 p-4" key={f.id}>
            <img
              src={f.imageUrl}
              alt={f.name}
              className="object-center object-cover w-90 h-90"
              loading="lazy"
            />
            <div className="h-10 mt-4 text-sm flex gap-2 items-center">
              <User className="h-4 w-4 text-blue" /> {f.name}
              <LocateIcon className="h-4 w-4 text-blue" /> {f.location}
              <Clock className="h-4 w-4 text-blue" /> {f.createdAt.slice(0, 10)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
