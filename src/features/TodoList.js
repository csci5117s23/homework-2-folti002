import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  console.log("My todos: " + todos);
  const todoList = todos.map((todoItem) =>
    <TodoItem item={todoItem.item} ></TodoItem>
  );

  return <div> {todoList} </div>;
}