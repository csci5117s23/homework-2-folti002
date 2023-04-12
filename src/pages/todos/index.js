import Link from 'next/link';
import { useEffect, useState } from 'react';
import TodoList from '@/features/TodoList';
import TopBar from '@/features/NavBar';
import AddTodoItem from '@/features/AddTodoItem';
import { getAllTodoItems, postNewTodoItem } from '@/modules/data';

export default function Todos() {
  // Set state variables and hooks
  const [newTodoItem, setNewTodoItem] = useState(false);
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch todos upon opening the page
  useEffect(() => {
    async function fetchData() {
      // Call data file to send HTTP request and update state
      const data = await getAllTodoItems();
      setTodos(data);
      setLoading(false);
      setNewTodoItem(false);
    }
    fetchData();
  }, [newTodoItem]);

  // Add new entry into the database and reload list of todos
  async function handleNewTodoItem(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // Call data file to add new item and reload list of todo items
    await postNewTodoItem(formJson);
    setNewTodoItem(true);
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
