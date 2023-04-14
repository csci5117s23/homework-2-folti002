import { useEffect, useState } from 'react';
import { getAllDoneTodoItems } from '@/modules/data';
import { useAuth } from '@clerk/nextjs';
import GeoDoListLayout from '@/features/GeoDoListLayout';

export default function DoneTodos() {
  // Set state variables and hooks
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);
  const { userId, getToken } = useAuth();

  // Fetch done todos upon opening the page
  useEffect(() => {
    async function fetchData() {
      // Grab JWT
      const token = await getToken({ template: 'codehooks' });

      // Call REST api and update state
      const data = await getAllDoneTodoItems(userId, token);
      setTodos(data);
      setLoading(false);
    }
    fetchData();
  }, [todos]);

  return (
    <GeoDoListLayout 
      loading={loading} 
      todos={todos} 
      handleNewTodoItem={null}
      isDone={true}
    />
  );
}
