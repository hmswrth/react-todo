import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleCheck() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleCheck}
      ></input>
      <label>{todo.name}</label>
    </div>
  );
}
