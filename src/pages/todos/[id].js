import NavBar from '@/features/NavBar';
import MyHead from '@/features/MyHead';
import { useRouter } from 'next/router'
import TodoItemPage from '@/features/TodoItemPage';
import { useEffect, useState } from 'react';
import { getTodoItemById } from '@/modules/data';
import { useAuth } from '@clerk/nextjs';

export default function TodoItemContent() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      // Grab JWT from Clerk
      const token = await getToken({ template: 'codehooks' });

      // Call REST api and update state
      const response = await getTodoItemById(id, token);
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <MyHead />
      <NavBar />
      { loading ? (
        <div className='todolist-container'>
          <span> Loading... </span>
        </div>
      ) : (
        <>
          <div className='todolist-container'>
            <TodoItemPage itemData={data}/>
          </div>
        </>
      )}
    </>
  );
}