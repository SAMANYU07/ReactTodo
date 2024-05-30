import { createSlice } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";
import todoService from "../appwrite/todoConfig";

const initialState = {
  todoList : [],
  userLoggedIn: false,
  userName: "",
  userID: "",
  loading: false,
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleLoggedinStatus: (status, action) => {
      status.userLoggedIn = action.payload;
    },
    isloggedin: (state) => {
      if (state.userLoggedIn)
        console.log("logged");
      else
        console.log("loggedout");
    },
    addTask: (state, action) => {
      const newItem = action.payload;
      try {
        todoService.addTodo(newItem);
        return {
          ...state,
          todoList: [...state.todoList, newItem],
        };
      } catch (error) {
        console.log("Task Addition Error: ", error);
      }
    },
    removeTodo: (state, action) => {
      const newArr = state.todoList.filter(todo => todo.uid !== action.payload);
      try {
        todoService.deleteTodo(action.payload);
        return {
          ...state,
          todoList: [...newArr],
        }
      } catch (error) {
        console.log("Deletion error: ", error);
      }
    },
    updateUserNameID: (state, action) => {
      state.userName = action.payload.name;
      state.userID = action.payload.id;
    },
    preloadData: (state, action) => {
      const newItem = action.payload;
      try {
        return {
          ...state,
          todoList: [...state.todoList, newItem],
        }
      } catch (error) {
        console.log("preload error: ", error);
      }
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearAllTodos: (state) => {
      try {
        return {
          ...state,
          todoList: [],
        }
      } catch (error) {
        console.log("Clearing todos error: ", error);
      }
    },
  }
})

export const { login, registerAccount, isloggedin, toggleLoggedinStatus, showAll, addTask, removeTodo, updateUserNameID, preloadData, toggleLoading, clearAllTodos } = todoSlice.actions;
export default todoSlice.reducer;