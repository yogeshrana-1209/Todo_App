import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  setSelectedTodo,
  deleteForm,
  fetchTodos,
  getTodoLoading,
  changeSearchTerm,
  getSearchTerm,
} from "../store/TodoSlice";
import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/sharedComponent/ui/confirmModal";
import TodoCard from "./TodoCard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/sharedComponent/ui/loadingSpinner";
import { getStatus } from "../../auth/store/AuthSlice";
import Navbar from "../../../components/layout/navbar";
import Pagination from "../../../features/pagination/components/pagination";
import { getCurrentPage, getItemsPerPage } from "../../pagination/store/PaginationSlice";


export default function TodoList() {
  const todos = useSelector(getTodoList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getStatus);
  const loading = useSelector(getTodoLoading);
  const currentPage = useSelector(getCurrentPage);
  const itemsPerPage = useSelector(getItemsPerPage);
  const searchTerm = useSelector(getSearchTerm);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTodos(currentPage, itemsPerPage, searchTerm));
    }
  }, [dispatch, isLoggedIn, todos.length, currentPage, itemsPerPage, searchTerm]);

  const handleEdit = (todo) => {
    const fixedTodo = {
      ...todo,
      id: Number(todo.id),
    }
    dispatch(setSelectedTodo(fixedTodo));
    navigate("/todo-form");
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
      const fixedId = Number(todoToDelete.id);
      dispatch(deleteForm(fixedId));
      closeDeleteModal();
    }
  };

  const handleAddNewTask = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(setSelectedTodo(null));
    navigate("/todo-form");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(changeSearchTerm(value));
    dispatch(fetchTodos(1, itemsPerPage, value));
  }

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = filteredTodos.slice(startIndex, endIndex);


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center m-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-5 inline-block border-2 border-blue-600 rounded-2xl bg-blue-50/50 px-8 py-2 shadow-md">
              Todo List
            </h1>
          </div>

          {isLoggedIn && (
            <div className="flex justify-center m-2 items-center">
              <button
                onClick={handleAddNewTask}
                className="w-44 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Add New Task
              </button>
            </div>
          )}

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
                onChange={handleSearchChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                 text-gray-700 text-base
                 shadow-sm transition duration-150 ease-in-out
                 placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 hover:border-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : currentTodos?.length === 0 ? (
            <p className="text-center text-xl text-gray-500 m-6 p-6 border-4 rounded-xl border-gray-400 border-dashed font-medium">
              No todos yet. Add your first todo!
            </p>
          ) : (
            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentTodos?.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onEdit={handleEdit}
                  onDelete={openDeleteModal}
                />
              ))}
            </div>
          )}
        </div>

        <Pagination
          // pageCount={todos.length}
          pageCount={(Math.ceil(filteredTodos.length / itemsPerPage))}
        // pageCount={Math.ceil(todos.length / itemsPerPage)}  // another approach to access pagination
        />

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
