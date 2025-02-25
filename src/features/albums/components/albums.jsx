import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, setPage, setSearchTerm, getCurrentPage, getAlbumList, getMaxRecords, getLimit, resetPage, getSearchTerm } from "../store/AlbumSlice";
import AlbumList from "./albumList";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import * as Yup from "yup";

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(getAlbumList);
  const page = useSelector(getCurrentPage);
  const limit = useSelector(getLimit);
  const maxRecords = useSelector(getMaxRecords);
  const searchTerm = useSelector(getSearchTerm);

  const totalPages = maxRecords > 0 ? Math.ceil(maxRecords / limit) : 1;
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchText("");
    dispatch(setSearchTerm(""));
    dispatch(resetPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAlbums(page, searchTerm));
  }, [dispatch, page, searchTerm]);

  //Validation with Yup
  const searchSchema = Yup.string()
    .trim()
    .required("Search field cannot be empty")
    .matches(/^[a-zA-Z0-9\s]+$/, "Only letters and numbers are allowed")
    .matches(/^(?!.*\s{2,}).*$/, "No consecutive spaces allowed");

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        searchSchema
          .validate(value)
          .then(() => {
            setError("");
            dispatch(setSearchTerm(value));
            dispatch(resetPage());
          })
          .catch((err) => {
            setError(err.message);
          });
      }, 1000),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  const onSearchChange = (e) => {
    const value = e.target.value.trimStart();
    setSearchText(value);

    if (value === "") {
      setError("");
      dispatch(setSearchTerm(""));
      dispatch(resetPage());
      return;
    }

    //Show error immediately when typing
    searchSchema
      .validate(value)
      .then(() => setError(""))
      .catch((err) => setError(err.message));

    handleSearch(value.trim());

  };

  const onSearchBlur = () => {
    setError("");
  }

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
          onBlur={onSearchBlur}
          placeholder="Search Albums"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

      </div>
      {error && (
        <p className="text-red-600 text-md mb-3 sm:text-sm px-2 py-1 rounded-md max-w-xs sm:max-w-sm mx-auto text-center">
          {error}
        </p>
      )}

      {/* Show Search Results Message */}
      {!error && searchTerm && maxRecords > 0 && (
        <p className="text-center mb-4 text-gray-600">
          {albums.length === 0
            ? `No records found for '${searchTerm}'`
            : `Total ${maxRecords} records found for '${searchTerm}'`
          }
        </p>
      )}

      {/* Show No Records Message */}
      {!error && searchTerm && maxRecords === 0 && (
        <p className="text-center text-gray-500">
          No records found for {searchTerm}
        </p>
      )}

      {/* Display Album List */}
      {albums.length > 0 ? (
        <AlbumList albums={albums}/>
      ) : (
        !error && !searchTerm && <p className="text-center text-gray-500">No albums found.</p>
      )}

      {/* Pagination Controls */}
      {maxRecords > 0 && albums.length > 0 && (
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
