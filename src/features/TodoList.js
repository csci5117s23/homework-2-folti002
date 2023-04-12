import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  const todoList = todos.map((todoItem) =>
    <TodoItem key={todoItem._id} todoItem={todoItem} ></TodoItem>
  );

  return <div> {todoList} </div>;
}