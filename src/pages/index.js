import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import NavBar from '@/features/NavBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>GeoDo List</title>
        <link rel="icon" href="/GeoDoListLogo.png" />
      </Head>
      <NavBar></NavBar>
      <div className='container'>
        <Image src='/GeoDoListLogo.png' width={400} height={400} alt='GeoDo List logo'/>
        <h1> Welcome to your GeoDo List! </h1>
        <h3> Sign in or create an account below! </h3>
        <button> Sign in/create account </button>
        <Link href='todos'> View your todos </Link>
      </div>
    </>
  );
}