import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { ToastContainer } from "react-toastify";


export const Todos = () => {
  return (
    <div className="flex flex-col gap-5">
      <ToastContainer />
      <TodoForm />
      <TodoList />
    </div>
  );
};
