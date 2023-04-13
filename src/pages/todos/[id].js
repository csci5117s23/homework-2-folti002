import NavBar from '@/features/NavBar';
import MyHead from '@/features/MyHead';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function TodoItemContent() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <MyHead />
      <NavBar />
      <h1> Todo Item with ID: {id} </h1>
      <Link href="/todos"> Return to todos list </Link>
    </>
  );
}