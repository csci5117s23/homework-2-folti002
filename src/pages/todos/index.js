import { useEffect, useState } from 'react';
import TodoList from '@/features/TodoList';
import NavBar from '@/features/NavBar';
import AddTodoItem from '@/features/AddTodoItem';
import HomePageRedirect from '@/features/HomePageRedirect';
import MyHead from '@/features/MyHead';
import { getAllTodoItems, postNewTodoItem } from '@/modules/data';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function Todos() {
  // Set state variables and hooks
  const router = useRouter();
  const [newTodoItem, setNewTodoItem] = useState(false);
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // Handle authorization - this if statement probably won't happen since
  // entire app is wrapped in Clerk's provider component
  useEffect(() => {
    async function handleAuth() {
      if(!isLoaded || !userId) {
        router.push('/');
      }
    }
    handleAuth();
  });

  // Fetch todos upon opening the page and every time a new item is added
  useEffect(() => {
    async function fetchData() {
      // Grab JWT from Clerk
      const token = await getToken({ template: 'codehooks' });

      // Call REST api and update state
      const data = await getAllTodoItems(userId, token);
      setTodos(data);
      setLoading(false);
      setNewTodoItem(false);
    }
    fetchData();
  }, [newTodoItem]);

  // Add new entry into the database and reload list of todos
  async function handleNewTodoItem(e) {
    // Grab data from form submission
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // Grab JWT from Clerk
    const token = await getToken({ template: 'codehooks' });

    // Call data file to add new item and reload list of todo items
    await postNewTodoItem(formJson, userId, token);
    setNewTodoItem(true);
  }
  
  return (
    <>
      <SignedIn>
        <MyHead />
        <NavBar />
        <div className='container'>
          <h1 className='title'> Todos </h1>

          { loading ? (
            <span> Loading... </span>
          ) : (
            <>
              {/* Display todos */}
              { todos ? (
                <TodoList todos={todos} />
              ) : (
                <h1 className='subtitle'> No todo items yet! </h1>
              )
              }

              {/* Text input for new todo item */}
              <AddTodoItem onAdd={handleNewTodoItem} />
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