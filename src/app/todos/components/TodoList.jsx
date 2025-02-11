import { useDispatch, useSelector } from "react-redux";
import {
  getTodoList,
  setSelectedTodo,
  deleteForm,
  fetchTodos,
} from "../store/todoSlice";
import { useState, useEffect } from "react";
import ConfirmModal from "../../sharedComponent/confirmModal"; // Import your ConfirmModal component
import TodoCard from "./TodoCard"; // Import the TodoCard component

export default function TodoList() {
  const todos = useSelector(getTodoList);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleEdit = (todo) => {
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
