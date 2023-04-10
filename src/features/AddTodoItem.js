export default function AddTodoItem({ onAdd }) {
  return (
    <>
      <h1> Submit new todo item: </h1>
      <div>
        <form method='post' onSubmit={onAdd}>
          <label>
            Todo Item: <input class='input is-primary' name='content' type='text' placeholder='Text input' />
          </label>
          <button type='submit'> Submit new todo item! </button>
        </form>
      </div>
    </>
  );
}