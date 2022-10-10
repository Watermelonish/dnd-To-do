import React, { useContext } from "react";
import { Context } from "../context";
function ToDoElement({ el, index }) {
  const {
    deleteItemHandler,
    handleCheckBox,
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
    doubleClickHandler,
    changeOneItem,
  } = useContext(Context);
  return (
    <div
      key={index}
      className="card"
      draggable="true"
      onDragStart={(e) => {
        e.stopPropagation();
        dragStartHandler(e, el);
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        dragEndHandler(e);
      }}
      onDrag={(e) => {
        // e.stopPropagation();
      }}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, el)}
    >
      <div className="card-body">
        
        <div className="orderNumb">
          <input
            onChange={handleCheckBox}
            class="form-check-input"
            type="checkbox"
            checked={el.isChecked}
            id={el.id}
          />
          {`${index}`}
        </div>
        {el.isInEditMode ? (
          <form class="row g-3" onSubmit={(e) => changeOneItem(e,el) }id={el.id}>

  <div class="col-auto">
    <input  className="form-control" type="text" name='oneItem'  id="inputOneItem" defaultValue={el.value}/>
  </div>
</form>
        ): el.isChecked ? (
          <div>
            <s>{`${el.value}`}</s>
          </div>
        ) : (
          <div onDoubleClick={doubleClickHandler} id = {el.id}>{`${el.value}`}</div>
        )}

        <button
          onClick={deleteItemHandler}
          data-id={el.id}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></button>
        
      </div>
    </div>
  );
}

export default ToDoElement;
