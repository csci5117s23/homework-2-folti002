import CategorySelections from "./CategorySelections";

export default function AddTodoItem({ onAdd, categories }) {
  return (
    <>
      <div className='todolist-container'>
        <form method='post' onSubmit={onAdd}>
          <label>
            <input className='input is-primary' name='content' type='text' placeholder='Todo item' />
          </label>
          <div className='select'>
            <CategorySelections categories={categories} />
          </div>
          <br />
          <button className='button' type='submit'> Submit </button>
        </form>
      </div>
    </>
  );
}