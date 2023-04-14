import { useEffect } from 'react';

export default function CategoryPage({ todoItems }) {
  return (
    <>
      <h1 className='title'> {todoItems[0].category} </h1>
      {/* Display todos */}
      { todoItems.length !== 0 ? (
        <>
          {/* Header for group of todos */}
          <div className='columns is-mobile'>
            <div className='column is-one-quarter small-todo-item'> Complete? </div>
            <div className='column is-one-half small-todo-item'> Content </div>
            <div className='column is-one-quarter small-todo-item'> Edit </div>
          </div>

          {/* List of todo items */}
          <TodoList todos={todoItems} />
        </>
      ) : (
        <h1 className='subtitle'> Nothing here yet :&#40; </h1>
      )
      }
    </>
  );
}