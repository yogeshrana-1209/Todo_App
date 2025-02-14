import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  setSelectedTodo,
  deleteForm,
  fetchTodos,
} from "../store/TodoSlice";
import { useState, useEffect } from "react";
import ConfirmModal from "../../sharedComponent/confirmModal"; // Import your ConfirmModal component
import TodoCard from "./TodoCard"; // Import the TodoCard component
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoadingSpinner from "../../sharedComponent/loadingSpinner"; // Import the LoadingSpinner
import { getStatus, logout } from "../store/AuthSlice";

export default function TodoList() {
  const todos = useSelector(getTodoList);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  

  //Get logged in status from Redux
  const isLoggedIn = useSelector(getStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [loaderDelay, setLoaderDelay] = useState(false); // For ensuring loader is shown for a minimum time

  const handleEdit = (todo) => {
    navigate('/todo-form');
    dispatch(setSelectedTodo(todo));
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to the login page after logout
  };

  useEffect(() => {
    // Set loading to true before fetching data
    setLoading(true);
    setLoaderDelay(true); // Start the loader delay

    dispatch(fetchTodos())
      .then(() => {
        // Set loading to false once fetching is complete
        setLoading(false);
      })
      .catch(() => {
        // Handle any errors here and set loading to false
        setLoading(false);
      });

    // Set loader to stay visible for at least 1 second
    const timer = setTimeout(() => {
      setLoaderDelay(false); // Stop the loader delay after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [dispatch]);

  const handleAddNewTask = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }
    navigate("/todo-form"); // Redirect to add new task form
  };


  return (
    <>

      <div className="min-h-screen rounded-2xl bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center m-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-5 inline-block border-2 border-blue-600 rounded-2xl bg-blue-50/50 px-8 py-4 shadow-md backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              Todo List
            </h1>
          </div>

          {/* Add New Task Button */}
          {isLoggedIn && (
            <div className="flex justify-center m-6 items-center">
              <button
                onClick={handleAddNewTask} // Use handleAddNewTask to clear selectedTodo
                className="w-44 py-2 px-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
              >
               +  Add New Task
              </button>
            </div>
          )}

          {/* Loading Spinner */}
          {loading || loaderDelay ? (
            <LoadingSpinner /> // Show the spinner while loading or during loader delay
          ) : (
            // Empty State or Todo Grid
            <>
              {todos && todos.length === 0 ? (
                <div className="max-w-lg mx-auto bg-white p-8 text-center shadow-lg rounded-2xl border-2 border-dashed border-gray-300 transform hover:scale-102 transition-all duration-300">
                  <p className="text-xl text-gray-500 font-medium">
                    No todos yet. Add your first todo!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {todos?.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onEdit={handleEdit}
                      onDelete={openDeleteModal}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Login/Logout Button */}
        <div className="flex justify-around m-[40px]">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-32 py-2 px-4 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-32 py-2 px-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
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
    </>
  );
}
