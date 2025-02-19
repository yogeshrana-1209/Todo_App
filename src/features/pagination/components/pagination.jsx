import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, getCurrentPage, getItemsPerPage } from "../store/PaginationSlice";
import PropTypes from "prop-types"; // Import PropTypes
import { fetchTodos } from "../../todos/store/TodoSlice";

const Pagination = ({ pageCount }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);
  const itemsPerPage = useSelector(getItemsPerPage);

  const totalPages = Math.ceil(pageCount / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      dispatch(fetchTodos(page,itemsPerPage)); //Fetch todos for the new page
    }
  };

  // const handleNext = () => {
  //   if (currentPage < totalPages) {
  //     dispatch(setCurrentPage(currentPage + 1));
  //   }
  // };

  // const handlePrevious = () => {
  //   if (currentPage > 1) {
  //     dispatch(setCurrentPage(currentPage - 1));
  //   }
  // };

  return (
    <div className="flex items-center justify-center py-3">
      <nav aria-label="Pagination" className="flex items-center space-x-2">
        <button
          // onClick={handlePrevious}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-300"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          // onClick={handleNext}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

// Add PropTypes validation for pageCount
Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired, // Ensures pageCount is a required number
};

export default Pagination;
