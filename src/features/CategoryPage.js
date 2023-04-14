import TodoList from "./TodoList";

export default function CategoryPage({ todoItemsForCategory, categoryName, isDone }) {
  // If there is no data, go to error page
  if(!todoItemsForCategory) {
    return null;
  } else if(todoItemsForCategory.length === 0) {
    return (
      <>
        <h1 className='title'> {categoryName} </h1>
        { isDone? (
          <h4 className='subtitle'> Done GeoDo Items </h4>
        ) : (
          <h4 className='subtitle'> Incomplete GeoDo Items </h4>
        )}
        <p> No GeoDo items in this category yet! </p>
      </>
    );
  }

  return (
    <>
      <h1 className='title'> {categoryName} </h1>
      { isDone? (
        <h4 className='subtitle'> Done GeoDo Items! </h4>
      ) : (
        <h4 className='subtitle'> Incomplete GeoDo Items! </h4>
      )}
      {/* Display todos */}
      { todoItemsForCategory.length !== 0 ? (
        <>
          {/* Header for group of todos */}
          <div className='columns is-mobile'>
            <div className='column is-one-quarter small-todo-item'> Complete? </div>
            <div className='column is-one-half small-todo-item'> Content </div>
            <div className='column is-one-quarter small-todo-item'> Edit </div>
          </div>

          {/* List of todo items */}
          <TodoList todos={todoItemsForCategory} />
        </>
      ) : (
        <h1 className='subtitle'> Nothing here yet :&#40; </h1>
      )
      }
    </>
  );
}