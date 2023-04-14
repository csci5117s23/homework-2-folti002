import Image from 'next/image';
import NavBar from '@/features/NavBar';
import { useRouter } from 'next/router';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import MySignInButton from '@/features/MySignInButton';
import MyHead from '@/features/MyHead';

// Home page asking the user to sign in or sign up
// to view their todos
export default function Home() {
  const router = useRouter();

  function TodosRedirect() {
    router.push('/todos');
  }

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
        <div className='todolist-container'>
          <Image src='/GeoDoListLogo.png' width={400} height={400} alt='GeoDo List logo'/>
          <h1 className='title'> Welcome to your GEOgraphy toDO List! </h1>
          <h3 className='subtitle'> Sign in or create an account below! </h3>
          <MySignInButton />
        </div>
      </SignedOut>
    </>
  );
}