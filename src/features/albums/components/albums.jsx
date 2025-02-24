import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, setPage, getCurrentPage, getAlbumList, getMaxRecords, getLimit } from "../store/AlbumSlice";
import AlbumList from "./albumList";
import { useEffect } from "react";

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(getAlbumList);
  const page = useSelector(getCurrentPage);
  const limit = useSelector(getLimit);
  const maxRecords = useSelector(getMaxRecords);

  const totalPages = Math.ceil(maxRecords / limit);

  useEffect(() => {
    dispatch(fetchAlbums(page));
  }, [dispatch, page]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Albums List</h1>
      <AlbumList albums={albums} />

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="mt-2">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Albums;
