import { useRouter } from "next/router";
import AddTodoItem from "./AddTodoItem";
import TodoList from "./TodoList";
import { useAuth } from "@clerk/nextjs";
import { postNewTodoItem } from "@/modules/data";

export default function CategoryPage({ todoItemsForCategory, categoryName, categoryId, isDone, setNewTodoItem }) {
  const router = useRouter();
  const { userId, getToken } = useAuth();
  
  // If there is no data, go to error page
  if(!todoItemsForCategory) {
    return null;
  } else if(todoItemsForCategory.length === 0) {
    return (
      <>
        <h1 className='title'> {categoryName} </h1>
        { isDone? (
          <h4 className='subtitle'> No done GeoDo items in this category yet! </h4>
        ) : (
          <>
            <h4 className='subtitle'> No incomplete GeoDo items in this category yet! </h4>
            <h4 className='subtitle'> Submit new todo item in this category </h4>
            <AddTodoItem 
              onAdd={handleNewTodoItem}
              categories={null}
            />
          </>
        )}
      </>
    );
  }

  // Add new entry into the database and reload list of todos
  async function handleNewTodoItem(e) {
    // Grab data from form submission
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // Grab JWT from Clerk
    const token = await getToken({ template: 'codehooks' });

    // Update formJson to include user id
    formJson.user_id = userId;
    formJson.category = categoryId;

    // Call data file to add new item and reload list of todo items
    await postNewTodoItem(formJson, token); 
    setNewTodoItem(true);

    // Push user back to todos page
    router.push('/todos');
    return;
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
          <TodoList todos={todoItemsForCategory} setNewTodoItem={setNewTodoItem}/>
        </>
      ) : (
        <h1 className='subtitle'> Nothing here yet :&#40; </h1>
      )
      }

      {/* Allow users to create new todo item if not on done category page */}
      { !isDone && (
        <>
          <h4 className='subtitle'> Submit new todo item in this category </h4>
          <AddTodoItem 
            onAdd={handleNewTodoItem}
            categories={null}
          />
        </>
      )}
    </>
  );
}