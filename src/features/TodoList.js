import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  const todoList = todos.map((todoItem) =>
    <TodoItem todoItem={todoItem} ></TodoItem>
  );

  return <div> {todoList} </div>;
}