import React from "react";
import "./App.scss";

function Todo({ todo, toggleTodo }) {
  function handleCheck() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <input
        className="checkbox"
        type="checkbox"
        checked={todo.complete}
        onChange={handleCheck}
      ></input>
      <label>{todo.name}</label>
    </div>
  );
}

export default Todo;
