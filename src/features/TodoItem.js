import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TodoItemLink from "./TodoItemLink";

export default function TodoItem({ todoItem }) {
  const [isChecked, setChecked] = useState(false);
  const maxStringLength = 50;
  
  // If a user clicks on the finished button, 
  function handleClick() {
    setChecked(!isChecked);
  }

  // Grab necessary data from todo item prop and set up link
  let content = todoItem.content;
  const id = todoItem._id;
  const itemLink = 'todos/' + id;

  // Shorten length of content if too long
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