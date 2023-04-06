import { useState } from "react";

export default function Todo({ item }) {
  const [isChecked, setChecked] = useState(false);

  function handleClick() {
    setChecked(!isChecked);
  }

  if(isChecked) {
    return (
      <div onClick={handleClick}>
        {item} done!
      </div>
    );
  } else {
    return (
      <div onClick={handleClick}>
        {item}
      </div>
    );
  }
}