import Link from 'next/link'

export default function error() {
  return (
    <div className='container'>
      <h1> Page not found! </h1>
      <Link href='todos'> Return to todo list </Link>
    </div>
  );
}