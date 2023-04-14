export default function AddCategory({ onAdd }) {
  return (
    <>
      <div className='form-container'>
        <form method='post' onSubmit={onAdd}>
          <label>
            <input className='input is-primary' name='name' type='text' placeholder='Category name' />
          </label>
          <br />
          <button className='button' type='submit'> Submit </button>
        </form>
      </div>
    </>
  );
}