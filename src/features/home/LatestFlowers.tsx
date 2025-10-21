import { useGetBlobsQuery, useDeleteBlobMutation } from "../../../redux/blobsApi";

export default function LatestFlowers() {
  const { data: flowers, isLoading, isError, isFetching } = useGetBlobsQuery();
  const [deleteBlob, { isLoading: isDeleting }] = useDeleteBlobMutation();

  const handleDelete = async (url: string) => {
    try {
      await deleteBlob({ url }).unwrap();
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  if (isLoading) {
    return (
      <>
        <h1>Latest Flowers</h1>
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-52 h-36 rounded-xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      </>
    );
  }

  if (isError || !flowers || flowers.length === 0) {
    return <>No latest flowers available!</>;
  }

  return (
    <>
      <h1>Latest Flowers</h1>
      {isFetching && <p className="text-sm text-gray-500">Refreshing…</p>}
      <div className="flex gap-2 flex-wrap">
        {flowers.map((f) => (
          <div key={f.pathname} className="flex flex-col items-start gap-1">
            <button
              className="text-sm text-red-600 underline"
              onClick={() => handleDelete(f.url)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
            <img
              src={f.url}
              alt={f.pathname}
              className="w-52 rounded-xl"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
}
