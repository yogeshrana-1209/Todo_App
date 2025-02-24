import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, setPage, getCurrentPage, getAlbumList } from "../store/AlbumSlice";
import AlbumList from "./albumList";
import { useEffect } from "react";

const MAX_RECORDS = 10;
// const LIMIT = 10;
// const TOTAL_PAGES = MAX_RECORDS / LIMIT; //Maximum pages (100 records / 10 records per page)

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(getAlbumList);
  const page = useSelector(getCurrentPage);

  useEffect(() => {
    dispatch(fetchAlbums(page));
  }, [dispatch, page]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Albums</h1>
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
        <span className="mt-2">Page {page} of {MAX_RECORDS}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page >= MAX_RECORDS}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Albums;
