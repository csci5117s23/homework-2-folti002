export default function CategorySelections({ categories }) {
  if(!categories){
    return null;
  }
  const categorySelections = categories.map((category) =>
    <option value={category._id}> {category.name} </option>
  );

  return <select name='category'> { categorySelections } </select>;
}