import { updateOneTodoItem } from '@/modules/data';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function TodoItemPage({ itemData }) {
  // If there is no data, go to error page 
  if(itemData.length === 0) {
    router.push('/404');
  }

  // Only one todo item, so grab that data from the array passed in
  const data = itemData[0];

  // State and router  
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [curContent, setCurContent] = useState(data.content);
  const { getToken } = useAuth();

  // Update todo item's content based on user's edits
  async function handleEdit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // Create JSON object to update database
    const newData = {
      "user_id": data.user_id,
      "content": formJson.editedContent,
      "complete": data.complete,
      // "category": itemData.category,
      "created_on": data.created_on,
      "_id": data._id
    };

    // Grab JWT
    const token = await getToken({ template: 'codehooks' });

    // Update item in the database and update state
    await updateOneTodoItem(newData, data._id, token);
    setIsEditing(!isEditing);
    setCurContent(formJson.editedContent);
  }

  // Allow ediitng
  function allowEdits() {
    setIsEditing(!isEditing);
  }

  return (
    <>
      <h1 className='title'> Your todo item: </h1>
      <div>
      { isEditing ? (
        <>
          <form method='post' onSubmit={handleEdit}>
            <div className='textarea-container'>
              <textarea className='textarea' name='editedContent' defaultValue={curContent} rows='10' />
            </div>
            <button className='button' onClick={allowEdits}> Cancel edits </button>
            <button className='button' type='submit'> Submit edits </button> 
          </form>
        </>
      ) : (
        <>
          <div className='textarea-container'>
            <textarea className='textarea' defaultValue={curContent} rows='10' disabled />
          </div>
          <button className='button' onClick={allowEdits}> Edit todo item </button> 
        </>
      )}
      </div>
    </>
  );
}