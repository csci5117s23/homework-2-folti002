import { updateOneTodoItem } from '@/modules/data';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import CategorySelections from './CategorySelections';

// Returns the dynamic page for a todo item, allowing a user to edit that item
export default function TodoItemPage({ itemData, categories, categoryName, setCategoryName }) {
  const router = useRouter();
  // If there is no data, go to error page 
  if(itemData.length === 0) {
    router.push('/404');
    return null;
  }

  // Only one todo item, so grab that data from the array passed in
  const data = itemData[0];

  // State and router
  const [isEditing, setIsEditing] = useState(false);
  const [curContent, setCurContent] = useState(data.content || '');
  const [curComplete, setCurComplete] = useState(data.complete || false);
  const { getToken } = useAuth();

  // Update todo item's content based on user's edits
  async function handleEdit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    let newComp = false;

    // Set whether or not the current formJson has a complete property
    // Update the current complete state accordingly
    if(formJson.newComplete){
      newComp = true;
    }

    // Create JSON object to update database
    const newData = {
      'user_id': data.user_id,
      'content': formJson.editedContent,
      'complete': newComp,
      'category': formJson.category,
      'created_on': data.created_on,
      '_id': data._id
    };

    // Grab JWT
    const token = await getToken({ template: 'codehooks' });

    // Update item in the database and update state
    await updateOneTodoItem(newData, data._id, token);
    setIsEditing(!isEditing);
    setCurContent(formJson.editedContent);
    setCurComplete(newComp);
    setCategoryName(formJson.category);
  }

  // Allow ediitng
  function allowEdits() {
    setIsEditing(!isEditing);
  }

  return (
    <>
      <h1 className='title'> Your todo item: </h1>
      <h4 className='subtitle'> Category: {categoryName} </h4>
      <div>
      { isEditing ? (
        <>
          <form method='post' onSubmit={handleEdit}>
            <div className='textarea-container'>
              <textarea className='textarea' name='editedContent' defaultValue={curContent || ''} rows='4' />
            </div>
            <div className='todo-item-form'>
              <label className='checkbox' >
                <input type='checkbox' name='newComplete' defaultChecked={curComplete}/>
                <span className='span-spacing'>Is this item complete?</span>
              </label>
              <br />
              { categories && (
                <>
                  <h4 className='subtitle'> Current category is {categoryName} </h4>
                  <CategorySelections categories={categories}/>
                </>
              )}
              <br />
              <button className='button narrow-button' onClick={allowEdits}> Cancel edits </button>
              <button className='button narrow-button' type='submit'> Submit edits </button> 
            </div>
          </form>
        </>
      ) : (
        <>
          <div className='textarea-container'>
            <textarea className='textarea' defaultValue={curContent} rows='4' disabled />
          </div>
          <button className='button' onClick={allowEdits}> Edit todo item </button> 
        </>
      )}
      </div>
    </>
  );
}