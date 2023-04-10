import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TodoItemLink from "./TodoItemLink";

export default function TodoItem({ todoItem }) {
  const [isChecked, setChecked] = useState(false);
  const maxStringLength = 20;

  function handleClick() {
    setChecked(!isChecked);
  }

  let content = todoItem.content;
  const id = todoItem._id;
  const itemLink = 'todos/' + id;

  if(content.length > maxStringLength){
    content = content.substring(0, maxStringLength) + "...";
  }

  return (
    <>
      <div className="todo-item">
        <FontAwesomeIcon icon={faSquareCheck} onClick={handleClick}/>
        {/* {isChecked ? (
          <span> <s>{content}</s> </span>
        ) : ( */}
          <span> {content} </span>
        {/* // )
        // } */}
        <TodoItemLink href={itemLink}></TodoItemLink>
      </div>
    </>
  );
}