import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
import uuidv4 from "uuid/dist/v4";
import "./App.scss";
import { Button, Card, IconButton, TextField } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlusOneSharpIcon from "@material-ui/icons/PlusOneSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const classes = useStyles();

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
    <div className={classes.root}>
      <div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoNameRef} />
      </div>
      <div>
        <ButtonGroup size="small">
          <IconButton onClick={handleAddTodo} aria-label="add" color="primary">
            <PlusOneSharpIcon />
          </IconButton>
          <IconButton
            onClick={handleClearTodo}
            aria-label="delete"
            color="secondary"
          >
            {" "}
            <DeleteForeverIcon />
          </IconButton>
        </ButtonGroup>
      </div>
      <div className="left">
        {todos.filter((todo) => !todo.complete).length} left to do{" "}
      </div>
    </div>
  );
}

export default App;
