import Category from "./Category";

export default function CategoryList({ loading, categories, handleNewCategory }) {
  if(categories === null){
    return <div> No categories yet! </div>;
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
        <div className='todo-item-list'> {categoryList} </div>
      )}
    </>
  );
}