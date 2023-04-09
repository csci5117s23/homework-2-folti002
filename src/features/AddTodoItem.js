export default function AddTodoItem({ onAdd }) {
  return (
    <>
      <h1> Submit new todo item: </h1>
      <div>
        <form method='post' onSubmit={onAdd}>
          <label>
            Todo Item: <input name='item' />
          </label>
          <button type='submit'> Submit new todo item! </button>
        </form>
      </div>
    </>
  );
}