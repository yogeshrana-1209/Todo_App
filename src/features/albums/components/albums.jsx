import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, setPage } from "../store/AlbumSlice";
import AlbumList from "./albumList";
import { useEffect } from "react";

const Albums = () => {
  const dispatch = useDispatch();
  const { albums, page, limit } = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(fetchAlbums(page, limit));
  }, [dispatch, page, limit]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Albums</h1>
      <AlbumList albums={albums} />

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => dispatch(setPage(page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Albums;
