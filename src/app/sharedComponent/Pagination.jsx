// import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = () => {
  return (
    <div className="flex justify-center mt-6">
      {/* <ReactPaginate
        previousLabel={
          <span className="inline-flex items-center px-4 py-2 text-gray-700 border border-gray-300 bg-white rounded-l-md hover:bg-gray-50 transition duration-200">
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="sr-only">Previous</span>
          </span>
        }
        nextLabel={
          <span className="inline-flex items-center px-4 py-2 text-gray-700 border border-gray-300 bg-white rounded-r-md hover:bg-gray-50 transition duration-200">
            <ChevronRightIcon className="w-5 h-5" />
            <span className="sr-only">Next</span>
          </span>
        }
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName="inline-flex -space-x-px rounded-md shadow-xs"
        pageClassName="page-item"
        pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        previousClassName="page-item cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        previousLinkClassName="flex items-center justify-center"
        nextClassName="page-item cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        nextLinkClassName="flex items-center justify-center"
        disabledClassName="cursor-not-allowed text-gray-400 bg-gray-100 border-gray-300"
        activeClassName="bg-indigo-600 text-white border-indigo-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600"
      />
    </div> */}
    
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>

    </div>
  );
};

// PropTypes validation
Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired, // pageCount should be a number and required
  onPageChange: PropTypes.func.isRequired, // onPageChange should be a function and required
};

export default Pagination;
