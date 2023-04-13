import Link from 'next/link';
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import TodoItemLink from './TodoItemLink';

export default function TodoItem({ todoItem }) {
  const [isChecked, setChecked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const maxStringLength = 50;
  
  // If a user clicks on the finished button, 
  function handleClick() {
    setChecked(!isChecked);
  }


  function changeIcon() {
    setIsHovering(!isHovering);
  }

  // Grab necessary data from todo item prop and set up link
  let content = todoItem.content;
  const id = todoItem._id;
  const itemLink = 'todos/' + id;

  // Shorten length of content if too long
  if(content.length > maxStringLength){
    content = content.substring(0, maxStringLength) + '...';
  }

  return (
    <>
      <Link href='/todo' onClick={handleClick}>
        { isHovering ? (
          <FontAwesomeIcon icon={faCircleCheck} onMouseEnter={changeIcon} style={{color: "#3a527f"}}/>
        ) : (
          <FontAwesomeIcon icon={faCircle} onMouseLeave={changeIcon} style={{color: "#3a527f"}}/>
        )}
      </Link>

      <span> {content} </span>
      
      <TodoItemLink href={itemLink}></TodoItemLink>
    </>
  );
}