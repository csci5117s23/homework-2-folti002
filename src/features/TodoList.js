import TodoItem from './TodoItem';

// Simply creates a list of todo items based on the given todos
export default function TodoList({ todos, setNewTodoItem }) {
  const todoList = todos.map((todoItem) =>
    <div className='columns is-mobile column-container'>
      <TodoItem key={todoItem._id} todoItem={todoItem} setNewTodoItem={setNewTodoItem}/>
    </div>
  );

  return <div className='todo-item-list'> {todoList} </div>;
}