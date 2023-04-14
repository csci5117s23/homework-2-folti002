import { useEffect, useState } from 'react';
import { getAllTodoItems, postNewTodoItem } from '@/modules/data';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import GeoDoListLayout from '@/features/GeoDoListLayout';

export default function Todos() {
  // Set state variables and hooks
  const router = useRouter();
  const [newTodoItem, setNewTodoItem] = useState(false);
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded, userId, getToken } = useAuth();

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

  // Fetch todos upon opening the page and every time a new item is added or removed
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
  }, [newTodoItem, todos]);

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

    // Call data file to add new item and reload list of todo items
    await postNewTodoItem(formJson, userId, token);
    setNewTodoItem(true);
  }
  
  return (
    <GeoDoListLayout 
      loading={loading} 
      todos={todos} 
      handleNewTodoItem={handleNewTodoItem}
      isDone={false}
    />
  );
}