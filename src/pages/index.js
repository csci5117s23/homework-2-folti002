import Head from 'next/head';
import Image from 'next/image';
import NavBar from '@/features/NavBar';
import { useRouter } from 'next/router';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import MySignInButton from '@/features/MySignInButton';
import { useEffect } from 'react';
import MyHead from '@/features/MyHead';

export default function Home() {
  const router = useRouter();
  const [userCount, setUserCount] = useState(0);

  function TodosRedirect() {
    router.push('/todos');
  }

  useEffect(() => {
    async function getUserCount() {
      const totalUsers = await clerkClient.users.getCount();
      setUserCount(totalUsers);
    }
    getUserCount();
  }, [userCount]);

  return (
    <>
      <MyHead />

      {/* If signed in, redirect to todos page */}
      <SignedIn>
        <TodosRedirect />
      </SignedIn>

      {/* If signed out, render home page */}
      <SignedOut>
        <NavBar />
        <div className='container'>
          <Image src='/GeoDoListLogo.png' width={400} height={400} alt='GeoDo List logo'/>
          <h1 className='title'> Welcome to your GEOgraphy toDO List! </h1>
          <h3 className='subtitle'> { userCount } people are using GeoDo List. </h3>
          <h3 className='subtitle'> Sign in or create an account below! </h3>
          <MySignInButton />
        </div>
      </SignedOut>
    </>
  );
}