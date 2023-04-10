import Link from 'next/link';
import { useEffect, useState } from 'react';
import TodoList from '@/features/TodoList';
import TopBar from '@/features/NavBar';

export default function DoneTodos() {
  const [loading, setLoading] = useState(false);

  const [todos, setTodos] = useState([{content: "This item is complete!"},
                                      {content: "This one is also complete!"}]);

  if(loading) {
    return (
      <>
        <TopBar></TopBar>
        <div className='container'>
          <span> Loading... </span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <TopBar> </TopBar>
        <div className='container'>
          <h1> Complete Todo Items </h1>
          { todos ? (
            <TodoList todos={todos}></TodoList>
          ) : (
            <h1> No todo items yet! </h1>
          )
          }
          <Link href='todos'> Back to current todo items! </Link>
        </div>
      </>
    );
  }
}
