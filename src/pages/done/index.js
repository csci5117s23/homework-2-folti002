import Link from 'next/link';
import { useEffect, useState } from 'react';
import TodoList from '@/features/TodoList';
import NavBar from '@/features/NavBar';
import MyHead from '@/features/MyHead';
import { getAllDoneTodoItems } from '@/modules/data';

export default function DoneTodos() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);

  // Fetch done todos upon opening the page
  useEffect(() => {
    async function fetchData() {
      // Call data file to send HTTP request and update state
      const data = await getAllDoneTodoItems();
      setTodos(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if(loading) {
    return (
      <>
        <MyHead />
        <NavBar></NavBar>
        <div className='todolist-container'>
          <span> Loading... </span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <MyHead />
        <NavBar> </NavBar>
        <div className='todolist-container'>
          <h1> Complete Todo Items </h1>
          { todos ? (
            <TodoList todos={todos}></TodoList>
          ) : (
            <h1> No done todo items yet! </h1>
          )
          }
          <Link href='todos'> Back to current todo items! </Link>
        </div>
      </>
    );
  }
}
