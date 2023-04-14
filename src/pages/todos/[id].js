import NavBar from '@/features/NavBar';
import MyHead from '@/features/MyHead';
import { useRouter } from 'next/router'
import TodoItemPage from '@/features/TodoItemPage';
import { useEffect, useState } from 'react';
import { getAllCategories, getOneCategory, getTodoItemById } from '@/modules/data';
import { useAuth } from '@clerk/nextjs';

export default function TodoItemContent() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const { userId, getToken } = useAuth();

  // Grab todo item information
  useEffect(() => {
    async function fetchData() {
      // Grab JWT from Clerk
      const token = await getToken({ template: 'codehooks' });

      // Call REST api and update state
      const response = await getTodoItemById(id, token);
      console.log(response);
      setData(response);

      // Also grab categories from api
      const curCategories = await getAllCategories(userId, token);
      setCategories(curCategories);

      // And grab the information regarding the current category and store
      const curCategoryName = await getOneCategory(response[0].category, token);
      setCategoryName(curCategoryName[0].name);

      setLoading(false);
    }
    fetchData();
  }, [categoryName]);

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
            <TodoItemPage itemData={data} categories={categories} categoryName={categoryName} setCategoryName={setCategoryName}/>
          </div>
        </>
      )}
    </>
  );
}