import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlbums,
  setPage,
  setSearchTerm,
  getCurrentPage,
  getAlbumList,
  getMaxRecords,
  getLimit,
  resetPage,
  getSearchTerm,
  getLoading,
} from "../store/AlbumSlice";
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
  const loading = useSelector(getLoading);

  const totalPages = maxRecords > 0 ? Math.ceil(maxRecords / limit) : 1;
  const [searchText, setSearchText] = useState(searchTerm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setSearchText("");
      dispatch(resetPage());
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    dispatch(fetchAlbums(page, searchTerm));
  }, [dispatch, page, searchTerm]);

  //Validation Schema with Yup
  const searchSchema = Yup.string()
    .required("Search field cannot be empty")
    .matches(/^(?!\s).*$/, "Search cannot start with space")
    .matches(/^(?!.*\s{1,}).*$/, "No consecutive spaces allowed")
    .matches(/^[a-zA-Z0-9\s]+$/, "Only letters and numbers are allowed");

  const handleSearch = useMemo(() => {

    return debounce((value) => {
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
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  // Handle Input Change 
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    //Show error immediately when typing
    searchSchema
      .validate(value)
      .then(() => setError(""))
      .catch((err) => setError(err.message));

    if (value.trim() === "") {
      setError("");
      dispatch(setSearchTerm(""));
      dispatch(resetPage());
      handleSearch.cancel();
      return;
    }

    handleSearch(value.trim());
    // console.log(value);
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Albums List</h1>

      {/* Search Bar  */}
      <div className="flex justify-center mb-4 pt-4">
        <input
          type="text"
          value={searchText}
          onChange={onSearchChange}
          onBlur={onSearchBlur}
          placeholder="Search by Title"
          className="px-4 py-2 border border-gray-400 rounded-lg w-80 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* //Error Message */}
      {error && (
        <p className="text-red-500 text-center mb-3 text-sm">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-center text-gray-600 mb-4">Loading albums...</p>
      )}

      {/* Show Search Results Message */}
      {!error && searchTerm && maxRecords > 0 && !loading && (
        <p className="text-center text-gray-600 mb-4">
          {albums.length === 0
            ? `No records found for '${searchTerm}'`
            : `Total ${maxRecords} records found for '${searchTerm}'`
          }
        </p>
      )}

      {/* Show No Records Message */}
      {!error && searchTerm && maxRecords === 0 && !loading && (
        <p className="text-center text-gray-500">
          No records found for {searchTerm}
        </p>
      )}

      {/* Display Album List */}
      {!loading && albums.length > 0 ? (
        <AlbumList albums={albums} searchTerm={searchTerm} />
      ) : (
        !error &&
        !searchTerm &&
        !loading && <p className="text-center text-gray-500">No albums found.</p>
      )}

      {/* Pagination Controls */}
      {maxRecords > 0 && albums.length > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            onClick={() => dispatch(setPage(page - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </button>
          <span className="mt-2">Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            onClick={() => dispatch(setPage(page + 1))}
            disabled={page >= totalPages || loading}
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
