import moment from "moment";
import PropTypes from "prop-types";
import TodoStatus from "./TodoStatus"; // Import the TodoStatus component

const TodoCard = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-l-4 border-blue-500 overflow-hidden relative">
      {/* Card Header */}
      <div className="p-6 space-y-6">
        {/* Name and Description Section */}
        <div className="space-y-3 text-left">
          <h3 className="text-xl font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
            Name : {todo.name}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">
            <b>Description</b> : {todo.description}
          </p>
        </div>

        {/* Date, Priority, and Status Section */}
        <div className="flex flex-wrap pb-20 gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <span className="mr-2">📅</span>
            {moment(todo.date).format("DD/MM/YYYY")}
          </span>
          <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <span className="mr-2">🎯</span>
            <span
              className={`font-medium ${
                todo.priority === "high"
                  ? "text-red-600"
                  : todo.priority === "medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {todo.priority} Priority
            </span>
          </span>
          <TodoStatus status={todo.status} />
        </div>
      </div>

      {/* Action Buttons Section (Aligned in a row) */}
      <div className="absolute bottom-4 right-4 flex flex-wrap gap-4">
        <button
          onClick={() => onEdit(todo)}
          className="inline-flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm py-2 px-4 rounded-lg border border-blue-600 transition-all duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo)}
          className="inline-flex items-center justify-center text-red-600 hover:text-white hover:bg-red-600 font-medium text-sm py-2 px-4 rounded-lg border border-red-600 transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// PropTypes for TodoCard Component
TodoCard.propTypes = {
  todo: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoCard;
