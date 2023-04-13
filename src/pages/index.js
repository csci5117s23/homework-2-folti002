import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import NavBar from '@/features/NavBar';
import { useRouter } from 'next/router';
import { useAuth } from "@clerk/nextjs";
import { useEffect } from 'react';
import MySignInButton from '@/features/MySignInButton';

export default function Home() {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    async function process(){
      // if(userId){
      //   const token = await getToken({ template: 'codehooks'});
        
      //   const result = await fetch()
      // }
    }
    process();
  }, [isLoaded]);

  return (
    <>
      <Head>
        <title>GeoDo List</title>
        <link rel="icon" href="/GeoDoListLogo.png" />
      </Head>
      <NavBar />
      <div className='container'>
        <Image src='/GeoDoListLogo.png' width={400} height={400} alt='GeoDo List logo'/>
        <h1 className='title'> Welcome to your GEOgraphy toDO List! </h1>
        <h3 className='subtitle'> Sign in or create an account below! </h3>
        <MySignInButton />
        {/* <Link href='todos'> View your todos </Link> */}
      </div>
    </>
  );
}