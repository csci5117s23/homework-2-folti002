import Link from 'next/link';
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import TodoItemLink from './TodoItemLink';
import { useAuth } from '@clerk/nextjs';
import { updateOneTodoItem } from '@/modules/data';

// Creates a container for a todo item
export default function TodoItem({ todoItem, setNewTodoItem }) {
  const [isComplete, setIsComplete] = useState(todoItem.complete || false);
  const maxStringLength = 35;
  const { getToken } = useAuth();

  // Grab necessary data from todo item prop and set up link
  let content = todoItem.content;
  const id = todoItem._id;
  const itemLink = '/todos/' + id;
  
  // If a user clicks on the complete button, the item should
  // be moved to the done page
  async function handleClick() {
    // Create JSON object to update database
    const newData = {
      'user_id': todoItem.user_id,
      'content': content,
      'complete': !todoItem.complete,
      'category': todoItem.category,
      'created_on': todoItem.created_on,
      '_id': id
    }

    // Grab JWT
    const token = await getToken({ template: 'codehooks' });

    // Update item in the database and state
    await updateOneTodoItem(newData, id, token);
    setIsComplete(!isComplete);
    setNewTodoItem(true);
  }

  // Shorten length of content if too long
  if(content.length > maxStringLength){
    content = content.substring(0, maxStringLength) + '...';
  }

  return (
    <>
      {/* Icon to handle setting item as complete */}
      <div className='column is-one-quarter todo-item'>
          { isComplete ? (
            <Link href='/done' onClick={handleClick}>
              <FontAwesomeIcon icon={faCircleCheck} style={{color: "#3a527f"}}/>
            </Link>
          ) : (
            <Link href='/todos' onClick={handleClick}>
              <FontAwesomeIcon icon={faCircle} style={{color: "#3a527f"}}/>
            </Link>
          )}
      </div>

      {/* Content of todo item */}
      <div className='column is-half todo-item'>
        <p> {content} </p>
      </div>

      {/* Edit todo item button */}
      <div className='column is-one-quarter todo-item'>
        <TodoItemLink href={itemLink} />
      </div>
    </>
  );
}