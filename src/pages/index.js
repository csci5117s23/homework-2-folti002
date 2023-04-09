import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>GeoDo List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        <h1> Welcome to your GeoDo List! </h1>
        <h3> Sign in or create an account below! </h3>
        <button> Sign in/create account </button>
        <br></br>
        <Link href='todos'> View your todos </Link>
      </div>
    </>
  );
}