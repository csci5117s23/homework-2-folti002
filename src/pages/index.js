import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import NavBar from '@/features/NavBar';
import { useRouter } from 'next/router';
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { useEffect } from 'react';
import MySignInButton from '@/features/MySignInButton';

export default function Home() {
  const router = useRouter();
  const { getToken } = useAuth();

  function TodosRedirect(){
    router.push('/todos');
  }

  return (
    <>
      <Head>
        <title>GeoDo List</title>
        <link rel="icon" href="/GeoDoListLogo.png" />
      </Head>

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
          <h3 className='subtitle'> Sign in or create an account below! </h3>
          <MySignInButton />
        </div>
      </SignedOut>
    </>
  );
}