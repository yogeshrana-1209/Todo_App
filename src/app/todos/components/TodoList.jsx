import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  setSelectedTodo,
  deleteForm,
  fetchTodos,
  getTodoLoading,
  getFirstLoad,
} from "../store/TodoSlice";
import { useEffect, useState } from "react";
import ConfirmModal from "../../sharedComponent/confirmModal";
import TodoCard from "./TodoCard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../sharedComponent/loadingSpinner";
import { getStatus } from "../../auth/store/AuthSlice";
import Navbar from "../../sharedComponent/navbar";

export default function TodoList() {
  const todos = useSelector(getTodoList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getStatus);
  const loading = useSelector(getTodoLoading);
  const firstLoad = useSelector(getFirstLoad);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleEdit = (todo) => {
    navigate("/todo-form");
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
      dispatch(deleteForm(todoToDelete.id));
      closeDeleteModal();
    }
  };

  useEffect(() => {
    if (isLoggedIn && firstLoad) {
      dispatch(fetchTodos());
    }
  }, [dispatch, isLoggedIn, firstLoad]);

  const handleAddNewTask = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/todo-form");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center m-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-5 inline-block border-2 border-blue-600 rounded-2xl bg-blue-50/50 px-8 py-4 shadow-md">
              Todo List
            </h1>
          </div>

          {isLoggedIn && (
            <div className="flex justify-center m-4 items-center">
              <button
                onClick={handleAddNewTask}
                className="w-44 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Add New Task
              </button>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : todos?.length === 0 ? (
            <p className="text-center text-xl text-gray-500 font-medium">
              No todos yet. Add your first todo!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>

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
