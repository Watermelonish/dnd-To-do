import React, { useState, useEffect, useRef } from "react";
import ToDoElement from "./ToDoElement";
import { Context } from "../context";
import NewToDo from "./NewToDo";
import "./TodoContainer.css";

function ToDoContainer() {
  const inputRef = useRef(null);
  const initTodos = [
    { value: "wash dishes", id: 1, isChecked: false, isInEditMode: false },
    { value: "feed your pet", id: 2, isChecked: false, isInEditMode: false },
  ];

  const [todosArr, setTodosArr] = useState(initTodos);
  const [inputToDo, setInputToDo] = useState(null);
  const [currentEl, setCurrentEl] = useState({});
  useEffect(() => {}, [todosArr]);

  const deleteItemHandler = (e) => {
    const index = e.target.dataset.id;
    const newArr = todosArr.filter((el) => {
      return el.id != index;
    });

    setTodosArr(newArr);
  };
  const changeInput = (e) => {
    setInputToDo(e.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    if (inputToDo) {
      const newObj = {
        value: inputToDo,
        id: Date.now(),
        isChecked: false,
        isInEditMode: false,
      };

      setTodosArr((prev) => [...prev, newObj]);
      setInputToDo("");
      e.target.newtodo.value = "";
    }
  };
  // EditMode turn On/Off
  const doubleClickHandler = (e) => {
    let newArr = todosArr.map((el) => {
      if (el.id == e.target.id) {
        el.isInEditMode = !el.isInEditMode;
        return el;
      }
      return el;
    });
    setTodosArr(newArr);
  };
  const changeOneItem = (e, el) => {
    e.preventDefault();
    console.log("works");
    let newArr = todosArr.map((item) => {
      if (item.id == e.target.id) {
        item.value = e.target.oneItem.value;
        item.isInEditMode = false;
        return item;
      }
      return item;
    });

    setTodosArr(newArr);
  };

  const handleCheckBox = (e) => {
    let newArr = todosArr.map((el) => {
      if (el.id == e.target.id) {
        el.isChecked = !el.isChecked;
        return el;
      }
      return el;
    });

    setTodosArr(newArr);
  };
  const clearDoneItems = () => {
   setTodosArr(todosArr.filter(el => el.isChecked==false));
  }
  //dnd logic
  function dragStartHandler(e, el) {
    console.log("drag", el);
    setCurrentEl(el);
  }
  function dragEndHandler(e) {
    e.preventDefault();
    // e.target.style.background = 'white'
  }
  function dragOverHandler(e) {
    e.preventDefault();
    // e.target.style.background = 'lightgrey'
  }
  function dropHandler(e, el) {
    e.preventDefault();
    setTodosArr(
      todosArr.map((item) => {
        if (item.id === el.id) {
          return { ...item, id: currentEl.id };
        }
        if (item.id === currentEl.id) {
          return { ...item, id: el.id };
        }
        return item;
      })
    );
  }
  const sortItems = (a, b) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <>
      <Context.Provider
        value={{
          deleteItemHandler,
          handleCheckBox,
          doubleClickHandler,
          dragStartHandler,
          dragEndHandler,
          dragOverHandler,
          dropHandler,
          changeOneItem,
        }}
      >
        <h1>My Todos</h1>
        <div className="ToDocontainer">
          {todosArr &&
            todosArr
              .sort(sortItems)
              .map((el, index) => (
                <ToDoElement key={index} el={el} index={index + 1} />
              ))}

          {inputToDo && <NewToDo inputToDo={inputToDo} />}
        </div>
        <div className="buttonsContainer">
          <form className="row g-3" onSubmit={addItem}>
            <div className="col-auto">
              <input
                onChange={changeInput}
                name="newtodo"
                type="text"
                className="form-control"
                placeholder="new Todo"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                add todo
              </button>
            </div>
          </form>

          <div className="buttonsContainer">
        
            <button onClick={() => setTodosArr([])} className="btn btn-danger">
              clear all
            </button>
           
            <button onClick={() => clearDoneItems()} className="btn btn-success">
              clear done
            </button>
          </div>
        </div>
      </Context.Provider>
    </>
  );
}

export default ToDoContainer;
