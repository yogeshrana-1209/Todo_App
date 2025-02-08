import { createSlice } from "@reduxjs/toolkit";
import { SuccessNotify,DangerNotify } from "../../sharedComponent/notification";
import axiosInstance from "../../services/api/utils/axiosConfig";
// import moment from 'moment';

const initialState = {
  todos: [],
  selectedTodo: null,
  // loading: false,
  error: null,
};

// Fetch todos from the server
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/todos");
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error(error);
    dispatch(setError("Failed to fetch todos"));
  }
};

// Code for Add new list item without using API
// export const submitForm = (newTodo) => (dispatch) => {
//   dispatch(addTodo(newTodo));
//   SuccessNotify("Item Added Successfully");
// };

// Add a new todo to the server
export const submitForm = (newTodo) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/todos", newTodo);
    dispatch(addTodo(response.data));
    // SuccessNotify("Item Added Successfully");
    DangerNotify("ITem added");
  } catch (error) {
    console.error(error);
    dispatch(setError("Failed to add todo"));
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
    const response = await axiosInstance.put(`/todos/${todo.id}`, todo);
    dispatch(updateTodo(response.data));
    SuccessNotify("Todo Updated Successfully");
    dispatch(setSelectedTodo(null)); // Clear selected todo after update
    return true;
  } catch (error) {
    console.error(error);
    dispatch(setError("Failed to update todo"));
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
    await axiosInstance.delete(`/todos/${id}`);
    dispatch(deleteTodo(id));
    SuccessNotify("Item Deleted Successfully");
  } catch (error) {
    console.error(error);
    dispatch(setError("Failed to delete todo"));
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

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  setSelectedTodo,
  deleteTodo,
  setError,
  setTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
