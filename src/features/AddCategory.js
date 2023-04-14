export default function AddCategory({ onAdd }) {
  return (
    <>
      <div className='form-container'>
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