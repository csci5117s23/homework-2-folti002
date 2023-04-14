import { SignedIn, SignedOut } from "@clerk/nextjs";
import MyHead from "./MyHead";
import NavBar from "./NavBar";
import TodoList from "./TodoList";
import HomePageRedirect from "./HomePageRedirect";
import AddTodoItem from "./AddTodoItem";

export default function GeoDoListLayout({ loading, todos, handleNewTodoItem, isDone }) {
  return (
    <>
      <SignedIn>
        <MyHead />
        <NavBar />
        <div className='todolist-container'>
          { isDone ? (
            <h1 className='title'> Your completed todos! </h1>
          ) : (
            <h1 className='title'> Your GeoDo List: </h1>
          )}

          {/* If not loading, list all todos! */}
          { loading ? (
            <span> Loading... </span>
          ) : (
            <>
              {/* Display todos */}
              { todos.length !== 0 ? (
                <>
                  {/* Header for group of todos */}
                  <div className='columns is-mobile'>
                    <div className='column is-one-quarter small-todo-item'> Complete? </div>
                    <div className='column is-one-half small-todo-item'> Content </div>
                    <div className='column is-one-quarter small-todo-item'> Edit </div>
                  </div>

                  {/* List of todo items */}
                  <TodoList todos={todos} />
                </>
              ) : (
                <h1 className='subtitle'> Nothing here yet :&#40; </h1>
              )
              }

              {/* Text input for new todo item */}
              { !isDone && (
                <AddTodoItem onAdd={handleNewTodoItem} />
              )}
            </>
            )
          }
        </div>
      </SignedIn>

      <SignedOut>
        <HomePageRedirect />
      </SignedOut>
    </>
  );
}