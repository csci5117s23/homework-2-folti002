import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import TodoList from './todos/TodoList';

export default function Todos() {
  const [loading, setLoading] = useState(false);

  const [todos, setTodos] = useState([{item: "This item is complete!"},
                                      {item: "This one is also complete!"}]);

  if(loading) {
    return (<span> Loading... </span>);
  } else {
    return (
      <div className='container'>
        { todos ? (
          <TodoList todos={todos}></TodoList>
        ) : (
          <h1> No todo items yet! </h1>
        )
        }
        <Link href='todos'> Back to current todo items! </Link>
      </div>
    );
  }
}
