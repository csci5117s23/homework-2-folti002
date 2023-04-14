import { useEffect, useState } from 'react';
import { getAllCategories, getAllTodoItems, postNewCategory, postNewTodoItem } from '@/modules/data';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import GeoDoListLayout from '@/features/GeoDoListLayout';
import CategoryList from '@/features/CategoryList';

export default function Todos() {
  // Set state variables and hooks
  const router = useRouter();
  const [newTodoItem, setNewTodoItem] = useState(false);
  const [todos, setTodos] = useState(null);
  const [newCategory, setNewCategory] = useState(false);
  const [categories, setCategories] = useState(null);
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
  }, []);

  // Fetch todos upon opening the page and every time a new item is added or removed
  // Also fetch categories
  useEffect(() => {
    async function fetchData() {
      // Grab JWT from Clerk
      const token = await getToken({ template: 'codehooks' });

      // Call REST api and update state
      const todoItems = await getAllTodoItems(userId, token);
      setTodos(todoItems);
      setNewTodoItem(false);

      // Fetch categories
      const readCategories = await getAllCategories(userId, token);
      setCategories(readCategories);
      setNewCategory(false);
      setLoading(false);
    }
    fetchData();
  }, [newTodoItem, newCategory]);

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
    await postNewTodoItem(formJson, token); 
    setNewTodoItem(true);
    setLoading(true);
  }

  // Add new category and reload list of categories
  async function handleNewCategory(e) {
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
    await postNewCategory(formJson, token);
    setNewCategory(true);
    setLoading(true);
  }
  
  return (
    <>
      <GeoDoListLayout 
        loading={loading} 
        todos={todos} 
        handleNewTodoItem={handleNewTodoItem}
        isDone={false}
        categories={categories}
        setNewTodoItem={setNewTodoItem}
      />

      <div className='todolist-container'>
        <h1 className='title'> Categories </h1>
        <CategoryList 
          loading={loading}
          categories={categories}
          handleNewCategory={handleNewCategory} 
          isDone={false}
        />
      </div>
    </>
  );
}