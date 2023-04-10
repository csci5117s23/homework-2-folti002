import Link from 'next/link';
import { useEffect, useState } from 'react';
import TodoList from '@/features/TodoList';
import TopBar from '@/features/NavBar';
import AddTodoItem from '@/features/AddTodoItem';

export default function Todos() {
  const API_ENDPOINT = "https://backend-rnkp.api.codehooks.io/dev/todos/";
  const API_KEY = "10772928-f01a-46be-b1b6-a67f7d64d93b";

  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT, {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
      });
      const data = await response.json()
      // update state -- configured earlier.
      setTodos(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  function handleNewTodoItem(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // Enter new todo item into our database
    // const response = fetch(API_ENDPOINT, {
    //   'method': 'POST',
    //   'headers': {'x-apikey': API_KEY},
    //   'body': formJson
    // });

    // console.log(response);

    if(todos) {
      setTodos(todos.concat({
        content: formJson.content
      }));
    } else {
      setTodos([{content: formJson.content}]);
    }
  }

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
          <h1> Todos </h1>
          { todos ? (
            <TodoList todos={todos}></TodoList>
          ) : (
            <h1> No todo items yet! </h1>
          )
          }

          {/* Text input for new todo item */}
          <AddTodoItem onAdd={handleNewTodoItem}> </AddTodoItem>

          <Link href='done' > View complete todo items </Link>
        </div>
      </>
    );
  }
}
