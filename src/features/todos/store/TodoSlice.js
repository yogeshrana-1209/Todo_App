import { createSlice } from "@reduxjs/toolkit";
import {
  SuccessNotify,
  DangerNotify,
} from "../../../components/sharedComponent/ui/notification";
import api from "../../../services/api/axiosConfig";

const initialState = {
  todos: [],
  selectedTodo: null,
  loading: false, // Add loading state
  searchTerm: "",
};

export const fetchTodos =
  (page, itemsPerPage, searchTerm = "") =>
  async (dispatch) => {
    dispatch(setLoading(true)); // Set loading before fetching
    try {
      const response = await api.get(
        `/todos?page=${page}&limit=${itemsPerPage}&q=${searchTerm}`
      );
      dispatch(setTodos(response.data));
      // console.log(response);
    } catch (error) {
      console.error(error);
      DangerNotify("Failed to fetch todos");
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false)); // Ensure loading stops after 1 second
      }, 1000);
    }
  };

// Add a new todo
export const submitForm = (requestedData) => async (dispatch) => {
  try {
    const response = await api.post("/todos", requestedData);
    dispatch(addTodo(response.data));
    SuccessNotify("Item Added Successfully");
    return true;
  } catch (error) {
    console.error(error);
    DangerNotify("Failed to add todo");
  }
};

// Update a todo
export const updateForm = (todo) => async (dispatch) => {
  try {
    const response = await api.put(`/todos/${todo.id}`, todo);
    dispatch(updateTodo(response.data));
    SuccessNotify("Todo Updated Successfully");
    dispatch(setSelectedTodo(null));
    return true;
  } catch (error) {
    console.error(error);
    DangerNotify("Failed to update todo");
    return false;
  }
};

// Delete a todo
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

// Selectors
export const getTodoList = (state) => state.todo.todos;
export const getSelectedTodo = (state) => state.todo.selectedTodo;
export const getTodoLoading = (state) => state.todo.loading;
export const getSearchTerm = (state) => state.todo.searchTerm;

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
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  setSelectedTodo,
  deleteTodo,
  setTodos,
  setLoading,
  changeSearchTerm,
} = todoSlice.actions;

export default todoSlice.reducer;
