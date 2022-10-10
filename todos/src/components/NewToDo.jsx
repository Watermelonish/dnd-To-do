import React from "react";

function NewToDo({ inputToDo }) {
  return (
    <div

      className="card"
    >
      <div className="new-card-body">
        <div className = 'inputToDo'>{`${inputToDo}`}</div>
      </div>
    </div>
  );
}

export default NewToDo;
