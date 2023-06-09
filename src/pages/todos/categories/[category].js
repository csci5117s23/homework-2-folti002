import { getOneCategory, getTodoItemsForCategory } from "@/modules/data";
import { useRouter } from "next/router";
import CategoryPage from "@/features/CategoryPage";
import MyHead from "@/features/MyHead";
import NavBar from "@/features/NavBar";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import HomePageRedirect from "@/features/HomePageRedirect";
import { useState, useEffect } from "react";

// Dynamic link for todo items in a certain category
export default function SingleCategoryPage() {
  const router = useRouter();
  const category = router.query;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const { userId, getToken } = useAuth();

  const [newTodoItem, setNewTodoItem] = useState(false);

  // Grab all todo items pertaining to this category
  useEffect(() => {
    async function fetchData() {
      // Grab JWT from Clerk
      const token = await getToken({ template: 'codehooks' });

      // Check if this category id exists!
      // If not, redirect to error page
      const categoryData = await getOneCategory(category.category, token);
      if(categoryData.length === 0){
        router.push('/404');
        return null;
      }
      setCategoryName(categoryData[0].name);

      // Call REST api and update state
      const response = await getTodoItemsForCategory(userId, category.category, token);
      setData(response);
      setLoading(false);
      setNewTodoItem(false);
    }
    fetchData();
  }, []);

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
              <CategoryPage 
                todoItemsForCategory={data}  
                categoryName={categoryName} 
                categoryId={category.category}
                isDone={false}
                setNewTodoItem={setNewTodoItem} />
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