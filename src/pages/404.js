import MyHead from '@/features/MyHead';
import NavBar from '@/features/NavBar';
import Link from 'next/link'

export default function error() {
  return (
    <>
      <MyHead />
      <NavBar />
      <div className='todolist-container'>
        <h1 className='title'> Page not found! </h1>
        <h3 className='subtitle'> Navigate to a valid page above </h3>
      </div>
    </>
  );
}