import Link from 'next/link';
import { useEffect, useState } from 'react';
import TodoList from './todos/TodoList';

export default function Todos() {
  const API_ENDPOINT = "https://backend-rnkp.api.codehooks.io/dev/flashCard/";
  const API_KEY = "10772928-f01a-46be-b1b6-a67f7d64d93b";

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const [todos, setTodos] = useState([{item: "Buy chicken nuggets"},
                                      {item: "Eat chicken nuggets"}]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT, {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
      })
      const data = await response.json()
      // update state -- configured earlier.
      setPosts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // handleNewTodoItem() {

  // }

  if(loading) {
    return (
      <div className='container'>
        <span> Loading... </span>
      </div>
    );
  } else {
    return (
      <div className='container'>
        {/* {posts[0].front} */}
        { todos ? (
          <TodoList todos={todos}></TodoList>
        ) : (
          <h1> No todo items yet! </h1>
        )
        }
        <Link href='done'> View complete todo items </Link>
      </div>
    );
  }
}