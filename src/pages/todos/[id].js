import { useRouter } from 'next/router'

export default function TodoItemContent() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <h1> Todo Item with ID: {id} </h1>
  );
}