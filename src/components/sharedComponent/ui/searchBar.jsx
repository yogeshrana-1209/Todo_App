import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm, getSearchTerm } from "../../../features/todos/store/TodoSlice";

const SearchBar = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector(getSearchTerm) || "";

    const onSearchChange = (e) => {
        dispatch(changeSearchTerm(e.target.value));
    };

    return (
        <div className="mb-6 pt-6 max-w-2xl mx-auto">
            <label
                htmlFor="search-input"
                className="block mb-2 px-1 text-base font-semibold text-gray-700"
            >
                Search Todos
            </label>
            <div className="relative">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search for todos..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
            text-gray-700 text-base
            shadow-sm transition duration-150 ease-in-out
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            hover:border-gray-400"
                />
            </div>
        </div>
    );
};

// Prop validation
SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
