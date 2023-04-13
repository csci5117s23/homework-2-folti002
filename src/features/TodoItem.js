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
      {/* Icon to handle setting item as complete */}
      <div className='column is-one-quarter todo-item'>
        <Link href='/todos' onClick={handleClick}>
          { isHovering ? (
            <FontAwesomeIcon icon={faCircleCheck} onMouseEnter={changeIcon} style={{color: "#3a527f"}}/>
          ) : (
            <FontAwesomeIcon icon={faCircle} onMouseLeave={changeIcon} style={{color: "#3a527f"}}/>
          )}
        </Link>
      </div>

      {/* Content of todo item */}
      <div className='column is-half todo-item'>
        <p> {content} </p>
      </div>

      {/* Edit todo item button */}
      <div className='column is-one-quarter todo-item'>
        <TodoItemLink href={itemLink}></TodoItemLink>
      </div>
    </>
  );
}