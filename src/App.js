import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
import uuidv4 from "uuid/dist/v4";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (setTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    // console.log(name);
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo} className="btn">
        {" "}
        Add Item{" "}
      </button>
      <button onClick={handleClearTodo} className="btn">
        {" "}
        Clear Completed{" "}
      </button>{" "}
      <div>{todos.filter((todo) => !todo.complete).length}left to do </div>
    </>
  );
}

export default App;
