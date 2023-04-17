import NavBar from '@/features/NavBar';
import MyHead from '@/features/MyHead';
import { useRouter } from 'next/router'
import TodoItemPage from '@/features/TodoItemPage';
import { useEffect, useState } from 'react';
import { getAllCategories, getOneCategory, getTodoItemById } from '@/modules/data';
import { useAuth, SignedIn, SignedOut } from '@clerk/nextjs';
import HomePageRedirect from '@/features/HomePageRedirect';

// Dynamic link for an unfinished todo item, renders a TodoItemPage
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
      setData(response);

      // Also grab categories from api
      const curCategories = await getAllCategories(userId, token);
      setCategories(curCategories);

      // And grab the information regarding the current category and store
      const curCategoryName = await getOneCategory(response[0].category, token);
      if(curCategoryName.length === 0){
        setCategoryName(null);
      } else {
        setCategoryName(curCategoryName[0].name);
      }

      setLoading(false);
    }
    fetchData();
  }, [categoryName]);

  return (
    <>
      <SignedIn>
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
      </SignedIn>

      <SignedOut>
        <HomePageRedirect />
      </SignedOut>
    </>
  );
}