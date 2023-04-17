import { useAuth } from '@clerk/nextjs';
import CategoryLink from './CategoryLink';
import { deleteSingleCategory } from '@/modules/data';

// Creates a container for a category
export default function Category({ categoryData, isDone, setLoading }) {
  const maxStringLength = 35;
  const { getToken } = useAuth();

  // Set up link to category page for this category and grab name
  const id = categoryData._id;
  let categoryLink = '/';
  if(!isDone) {
    categoryLink = '/todos/categories/' + id;
  } else {
    categoryLink = '/done/' + id;
  }
  let categoryName = categoryData.name;

  // Slice long category names
  if(categoryName.length > maxStringLength) {
    categoryName = categoryName.substring(0, maxStringLength) + '...';
  }  

  // Delete a category
  async function handleDeleteCategory() {
    setLoading(true);
    const token = await getToken({ template: 'codehooks' });
    await deleteSingleCategory(id, token);
    setLoading(false);
  }

  return (
    <>
      <div className='todo-item'>
        <CategoryLink href={categoryLink} name={categoryData.name} />
        <button className='button' onClick={handleDeleteCategory}> Delete this category </button>
        <div className='bottom-button-space' />
      </div>
    </>
  );
}