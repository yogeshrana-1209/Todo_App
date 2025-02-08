import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  setSelectedTodo,
  deleteForm,
  fetchTodos,
  getTodoError,
  
} from "../store/todoSlice";
import moment from "moment";
import { useState, useEffect } from "react";
import ConfirmModal from "../../sharedComponent/confirmModal"; // Import your ConfirmModal component

export default function TodoList() {
  const todos = useSelector(getTodoList);
  const error = useSelector(getTodoError);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleEdit = (todo) => {
    dispatch(setSelectedTodo(todo));
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Edit button click");
  };

  const openDeleteModal = (todo) => {
    setTodoToDelete(todo);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  const handleDelete = () => {
    if (todoToDelete) {
      dispatch(deleteForm(todoToDelete.id)); // Delete the todo
      closeDeleteModal(); // Close the modal after deletion
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-5 inline-block border-2 border-blue-600 rounded-2xl bg-blue-50/50 px-8 py-4 shadow-md backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            Todo List
          </h1>
        </div>
        {error && <p>{error}</p>}

        {/* Empty State */}
        {todos && todos.length === 0 ? (
          <div className="max-w-lg mx-auto bg-white p-8 text-center shadow-lg rounded-2xl border-2 border-dashed border-gray-300 transform hover:scale-102 transition-all duration-300">
            <p className="text-xl text-gray-500 font-medium">
              No todos yet. Add your first todo!
            </p>
          </div>
        ) : (
          /* Todo Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {todos?.map((todo) => (
              <div
                key={todo.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-l-4 border-blue-500 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                        {todo.name}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-2 min-h-[40px]">
                        {todo.description}
                      </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="inline-flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm py-2 px-4 rounded-lg border border-blue-600 transition-all duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(todo)}
                        className="inline-flex items-center justify-center text-red-600 hover:text-white hover:bg-red-600 font-medium text-sm py-2 px-4 rounded-lg border border-red-600 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3 text-sm">
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
                    </div>

                    <div className="flex items-center">
                      <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span className="mr-2">🔖</span>
                        <span
                          className={`font-medium ${
                            todo.status === "Done"
                              ? "text-green-600"
                              : todo.status === "Pending"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        >
                          {todo.status || "Not Set"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
}
