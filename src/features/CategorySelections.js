export default function CategorySelections({ categories }) {
  if(!categories){
    return null;
  }
  const categorySelections = categories.map((category) =>
    <option key={category._id} value={category._id}> {category.name} </option>
  );

  return <select name='category' className='select narrow-select'> { categorySelections } </select>;
}