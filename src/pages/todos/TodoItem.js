import { useState } from "react";

export default function TodoItem({ item }) {
  const [isChecked, setChecked] = useState(false);

  function handleClick() {
    setChecked(!isChecked);
  }

  return (
    <div>
      <label>
        <input type="checkbox" onClick={handleClick} />
        {isChecked ? (
          <span> <s>{item}</s> </span>
        ) : (
          <span> {item} </span>
        )
        }
      </label>
    </div>
  );
}