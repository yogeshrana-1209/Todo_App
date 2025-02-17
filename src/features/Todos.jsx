import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


export const Todos = () => {
  return (
    <div className="flex flex-col gap-5">
      <TodoForm />
      <TodoList />
    </div>
  );
};
