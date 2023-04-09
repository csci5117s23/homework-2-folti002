import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function TodoItem({ todoItem }) {
  const [isChecked, setChecked] = useState(false);
  const maxStringLength = 20;

  function handleClick() {
    setChecked(!isChecked);
  }

  let content = todoItem.content;

  if(content.length > maxStringLength){
    content = content.substring(0, maxStringLength) + "...";
  }

  return (
    <div className="todo-item" onClick={handleClick}>
      <FontAwesomeIcon icon={faSquareCheck} />
      {isChecked ? (
        <span> <s>{content}</s> </span>
      ) : (
        <span> {content} </span>
      )
      }
    </div>
  );
}