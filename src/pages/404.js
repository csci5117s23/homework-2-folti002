import Link from 'next/link'

export default function error() {
  return (
    <div className='container'>
      <h1> An error occurred. </h1>
      <Link href='todos'> Return to todo list </Link>
    </div>
  );
}