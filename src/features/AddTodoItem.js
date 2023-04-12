export default function AddTodoItem({ onAdd }) {
  return (
    <>
      <div>
        <form method='post' onSubmit={onAdd}>
          <label>
            Submit new todo item: <input className='input is-primary' name='content' type='text' placeholder='Text input' />
          </label>
          <button type='submit'> Submit new todo item! </button>
        </form>
      </div>
    </>
  );
}