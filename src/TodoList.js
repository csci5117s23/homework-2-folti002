import Todo from "./Todo";

export default function TodoList({ todos }) {
  console.log(todos);
  const todoList = todos.map((todoItem) =>
    <Todo item={todoItem.item} ></Todo>
  );

  return <div> {todoList} </div>;
}