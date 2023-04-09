import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  const todoList = todos.map((todoItem) =>
    <TodoItem item={todoItem.item} ></TodoItem>
  );

  return <div> {todoList} </div>;
}