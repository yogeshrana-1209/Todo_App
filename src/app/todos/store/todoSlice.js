import { createSlice } from "@reduxjs/toolkit";
import {
  SuccessNotify,
  DangerNotify,
} from "../../sharedComponent/notification";
import api from "../../services/api/utils/axiosConfig";

const initialState = {
  todos: [],
  selectedTodo: null,
  
};

// Fetch todos from the server
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await api.get('/todos');
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error(error);
    DangerNotify("Failed to fetch todos");
  }
};

// Code for Add new list item without using API
// export const submitForm = (newTodo) => (dispatch) => {
//   dispatch(addTodo(newTodo));
//   SuccessNotify("Item Added Successfully");
// };

// Add a new todo to the server
export const submitForm = (requestedData) => async (dispatch) => {
  try {
    const response = await api.post('/todos',requestedData);
    dispatch(addTodo(response.data));
    SuccessNotify("Item Added Successfully");
    return true;
  } catch (error) {
    console.error(error);
    DangerNotify("Failed to add todo");
  }
};

//Code for Update the list item without using API
// export const updateForm = (todo) => (dispatch) => {
//   dispatch(setSelectedTodo(todo));
//   dispatch(updateTodo(todo));
//   SuccessNotify("Todo Updated Successfully");
//   dispatch(setSelectedTodo(null));
// };

export const updateForm = (todo) => async (dispatch) => {
  try {
    const response = await api.put(`/todos/${todo.id}`,todo);
    dispatch(updateTodo(response.data));
    SuccessNotify("Todo Updated Successfully");
    dispatch(setSelectedTodo(null)); // Clear selected todo after update
    return true;
  } catch (error) {
    console.error(error);
    DangerNotify("Failed to update todo");
    return false;
  }
};

//Code for delete the list item without using API
// export const deleteForm = (id) => (dispatch) => {
//   dispatch(deleteTodo(id));
//   SuccessNotify("Item Deleted Successfully");
// };

export const deleteForm = (id) => async (dispatch) => {
  try {
    await api.delete(`/todos/${id}`);
    dispatch(deleteTodo(id));
    SuccessNotify("Item Deleted Successfully");
  } catch (error) {
    console.error(error);
    DangerNotify("Failed to delete todo");
  }
};

//Selectors
export const getTodoList = (state) => state.todo?.todos;
export const getSelectedTodo = (state) => state.todo.selectedTodo;
export const getTodoError = (state) => state.todo.error;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
    },

    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },

    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id); // Delete todo by ID
    },

    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const { addTodo, updateTodo, login, logout, setSelectedTodo, deleteTodo, setTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
