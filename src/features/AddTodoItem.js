import CategorySelections from "./CategorySelections";

export default function AddTodoItem({ onAdd, categories }) {
  return (
    <>
      <div className='form-container'>
        <form method='post' onSubmit={onAdd}>
          <label>
            <input className='input is-primary' name='content' type='text' placeholder='Todo item' />
          </label>
          <hr />
          { categories.length === 0 ? (
            <h4 className='subtitle'> Create a category before submitting a new GeoDo item! </h4>
          ) : (
            <div >
              <CategorySelections categories={categories} />
            </div>
          )}
          <br />
          { categories.length === 0 ? (
            <button className='button' type='submit' disabled> Submit </button>
          ) : (
            <button className='button' type='submit'> Submit </button>
          )}          
        </form>
      </div>
    </>
  );
}