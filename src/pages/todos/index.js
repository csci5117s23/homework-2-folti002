import Link from 'next/link';
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
  const [token, setToken] = useState(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // Handle authorization
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
      // Grab JWT token from Clerk
      const token = await getToken({ template: 'codehooks' });

      // Call data file to send HTTP request and update state
      const data = await getAllTodoItems(token, userId);
      setTodos(data);
      setLoading(false);
      setNewTodoItem(false);
    }
    fetchData();
  }, [newTodoItem]);

  // Add new entry into the database and reload list of todos
  async function handleNewTodoItem(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // Call data file to add new item and reload list of todo items
    await postNewTodoItem(formJson);
    setNewTodoItem(true);
  }

  if(loading) {
    return (
      <>
        <MyHead />
        <NavBar />
        <div className='container'>
          <span> Loading... </span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <SignedIn>
          <MyHead />
          <NavBar />
          <div className='container'>
            <h1 className='title'> Todos </h1>

            {/* Display todos */}
            { todos ? (
              <TodoList todos={todos} />
            ) : (
              <h1 className='subtitle'> No todo items yet! </h1>
            )
            }

            {/* Text input for new todo item */}
            <AddTodoItem onAdd={handleNewTodoItem} />

            <Link href='done'> View complete todo items </Link>
          </div>
        </SignedIn>

        <SignedOut>
          <HomePageRedirect />
        </SignedOut>
      </>
    );
  }
}
