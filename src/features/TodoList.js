import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  const todoList = todos.map((todoItem) =>
    <div className='columns is-mobile column-container'>
      <TodoItem key={todoItem._id} todoItem={todoItem} ></TodoItem>
    </div>
  );

  return <div className='todo-item-list'> {todoList} </div>;
}