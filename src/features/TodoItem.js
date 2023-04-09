import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function TodoItem({ item }) {
  const [isChecked, setChecked] = useState(false);
  const maxStringLength = 20;

  function handleClick() {
    setChecked(!isChecked);
  }

  if(item.length > maxStringLength){
    item = item.substring(0, maxStringLength) + "...";
  }

  return (
    <div className="todo-item" onClick={handleClick}>
      <FontAwesomeIcon icon={faSquareCheck} />
      {isChecked ? (
        <span> <s>{item}</s> </span>
      ) : (
        <span> {item} </span>
      )
      }
    </div>
  );
}