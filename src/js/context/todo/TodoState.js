import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screen/screenContext";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { Http } from "../../http";

export function TodoState({ children }) {
  const initState = {
    todos: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(todoReducer, initState);
  const { changeScreen } = useContext(ScreenContext);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-app-c3bea-default-rtdb.firebaseio.com/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, id: data.name, title });
    } catch (error) {
      showError("Something went wrong...");
    }
  };

  const removeTodo = (id) => {
    clearError();
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Remove Item",
      `Are you sure to remove "${todo.title}"`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              changeScreen(null);
              await Http.delete(
                `https://rn-todo-app-c3bea-default-rtdb.firebaseio.com/todos/${id}.json`
              );
              dispatch({ type: REMOVE_TODO, id });
            } catch (error) {
              showError();
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await fetch(
        `https://rn-todo-app-c3bea-default-rtdb.firebaseio.com/todos/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError("Something went wrong...");
    } finally {
      clearError();
    }
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://rn-todo-app-c3bea-default-rtdb.firebaseio.com/todos.json"
      );
      const todos = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
        : [];
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError("Something went wrong...");
      console.error(error);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
