export default function AddTodoItem({ onAdd }) {
  return (
    <>
      <div className='todolist-container'>
        <form method='post' onSubmit={onAdd}>
          <label>
            <input className='input is-primary' name='content' type='text' placeholder='Text input' />
          </label>
          <button className='button' type='submit'> Submit new todo item! </button>
        </form>
      </div>
    </>
  );
}