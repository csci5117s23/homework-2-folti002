import { useEffect, useState } from 'react';
import { getAllDoneTodoItems } from '@/modules/data';
import { useAuth } from '@clerk/nextjs';
import GeoDoListLayout from '@/features/GeoDoListLayout';
import CategoryList from '@/features/CategoryList';
import { getAllCategories } from '@/modules/data';
import { postNewCategory } from '@/modules/data';

// Grabs data for all done todos and displays them
// along with all categories
export default function DoneTodos() {
  // Set state variables and hooks
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);
  const [newCategory, setNewCategory] = useState(false);
  const [categories, setCategories] = useState(null);
  const [newTodoItem, setNewTodoItem] = useState(false);
  const { userId, getToken } = useAuth();

  // Fetch done todos upon opening the page
  useEffect(() => {
    async function fetchData() {
      // Grab JWT
      const token = await getToken({ template: 'codehooks' });

      // Call REST api and update state
      const data = await getAllDoneTodoItems(userId, token);
      setTodos(data);
      setNewTodoItem(false);

      // Fetch categories
      const readCategories = await getAllCategories(userId, token);
      setCategories(readCategories);
      setLoading(false);
      setNewCategory(false);
    }
    fetchData();
  }, [newTodoItem, newCategory]);

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
        handleNewTodoItem={null}
        isDone={true}
        categories={null}
        setNewTodoItem={setNewTodoItem}
      />

      <div className='todolist-container'>
      <h1 className='title'> Categories </h1>
      <CategoryList 
        loading={loading}
        categories={categories}
        handleNewCategory={handleNewCategory} 
        isDone={true}
      />
    </div>
  </>
  );
}
