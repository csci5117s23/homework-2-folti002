import { useAuth } from '@clerk/nextjs';
import CategoryLink from './CategoryLink';

export default function Category({ categoryData }) {
  const maxStringLength = 50;
  const { getToken } = useAuth();

  // Set up link to category page for this category and grab name
  const id = categoryData._id;
  const categoryLink = '/todos/categories/' + id;
  let categoryName = categoryData.name;

  // Slice long category names
  if(categoryName.length > maxStringLength) {
    categoryName = categoryName.substring(0, maxStringLength) + '...';
  }  

  return (
    <>
      <div className='todo-item'>
        <CategoryLink href={categoryLink} name={categoryData.name} />
      </div>
    </>
  );
}