import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  setSelectedTodo,
  deleteForm,
  fetchTodos,
  getTodoLoading,
  getCurrentPage,
  getItemsPerPage,
} from "../store/TodoSlice";
import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/sharedComponent/ui/confirmModal";
import TodoCard from "./TodoCard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/sharedComponent/ui/loadingSpinner";
import { getStatus } from "../../auth/store/AuthSlice";
import Navbar from "../../../components/layout/navbar";
import Pagination from "../../../components/sharedComponent/ui/pagination";
// import { getCurrentPage, getItemsPerPage } from "../../pagination/store/PaginationSlice";
// import SearchBar from "../../../components/sharedComponent/ui/searchBar";

export default function TodoList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todos = useSelector(getTodoList) || [];
  const isLoggedIn = useSelector(getStatus);
  const loading = useSelector(getTodoLoading);
  const currentPage = useSelector(getCurrentPage);
  const itemsPerPage = useSelector(getItemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTodos(currentPage, itemsPerPage));
    }
  }, [dispatch, isLoggedIn, currentPage, itemsPerPage]);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = todos.slice(startIndex, endIndex);

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

          {/* Use the SearchBar component */}
          {/* <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} /> */}

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
          pageCount={todos.length}
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
