import AddCategory from "./AddCategory";
import Category from "./Category";

export default function CategoryList({ loading, categories, handleNewCategory }) {
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
  const categoryList = categories.map((category) =>
    <div className='column-container'>
      <Category key={category._id} categoryData={category} />
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