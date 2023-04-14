import AddCategory from "./AddCategory";
import Category from "./Category";

// Creates a list of Category components and places them in columns
export default function CategoryList({ loading, categories, handleNewCategory, isDone }) {
  // If there are no categories, let users create a new one
  if(categories === null){
    return (
      <>
        { loading && (
          <div className='todolist-container'> Loading... </div>
        )}
        <h4 className='subtitle'> Create a new category </h4>
        <AddCategory onAdd={handleNewCategory}/>
      </>
    );
  }

  // Create Category components and put them in their own columns
  const categoryList = categories.map((category) =>
    <div className='column-container'>
      <Category key={category._id} categoryData={category} isDone={isDone}/>
    </div>
  );

  return (
    <>
      { loading ? (
        <div className='todolist-container'> Loading... </div>
      ) : (
        <>
          <div className='todo-item-list'> {categoryList} </div>
          <h4 className='subtitle'> Create a new category </h4>
          
          <AddCategory onAdd={handleNewCategory}/>
        </>
      )}
    </>
  );
}