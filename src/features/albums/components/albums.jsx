import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, setPage, setSearchTerm, getCurrentPage, getAlbumList, getMaxRecords, getLimit, resetPage, getSearchTerm } from "../store/AlbumSlice";
import AlbumList from "./albumList";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(getAlbumList);
  const page = useSelector(getCurrentPage);
  const limit = useSelector(getLimit);
  const maxRecords = useSelector(getMaxRecords);
  const searchTerm = useSelector(getSearchTerm);

  const totalPages = maxRecords > 0 ? Math.ceil(maxRecords / limit) : 1;
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText("");
    dispatch(setSearchTerm(""));
    dispatch(resetPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAlbums(page, searchTerm));
  }, [dispatch, page, searchTerm]);

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(setSearchTerm(value));
        dispatch(resetPage());
        // console.log("Search Term: ", value);
        // dispatch(setPage(1));
        // dispatch(fetchAlbums(1, value, page, searchTerm));
      }, 1500),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  };

  // const getPageNumbers = () => {
  //   const pages = [];
  //   const maxVisiblePages = 4;
  //   const showDots = totalPages > maxVisiblePages;

  //   if (!showDots) {
  //     for (let i = 1; i <= totalPages; i++) {
  //       pages.push(i);
  //     }
  //   } else {
  //     pages.push(1);
  //     let startPage = Math.max(2, page - 1);
  //     let endPage = Math.min(totalPages - 1, page + 1);

  //     if (startPage > 2) {
  //       pages.push("...");
  //     }

  //     for (let i = startPage; i <= endPage; i++) {
  //       pages.push(i);
  //     }

  //     if (endPage < totalPages - 1) {
  //       pages.push("...");
  //     }
  //     pages.push(totalPages);
  //   }
  //   return pages;
  // };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Albums List</h1>

      {/* Search Bar  */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchText}
          onChange={onSearchChange}
          placeholder="Search Albums"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <AlbumList albums={albums} />

      {/* Pagination Controls */}
      {maxRecords > 0 && (
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
      )}
    </div>
  );
};

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">Albums List</h1>
//       <AlbumList albums={albums} />

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-center gap-2">
//         {/* Previous Button */}
//         <button
//           className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
//           onClick={() => dispatch(setPage(page - 1))}
//           disabled={page === 1}
//         >
//           {"<"}
//         </button>

//         {/* Page Numbers */}
//         {getPageNumbers().map((p, index) => (
//           <button
//             key={index}
//             className={`px-3 py-2 rounded ${p === page ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//             onClick={() => typeof p === "number" && dispatch(setPage(p))}
//             disabled={p === "..."}
//           >
//             {p}
//           </button>
//         ))}

//         {/* Next Button */}
//         <button
//           className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
//           onClick={() => dispatch(setPage(page + 1))}
//           disabled={page >= totalPages}
//         >
//           {">"}
//         </button>
//       </div>
//     </div>
//   );
// };

export default Albums;
