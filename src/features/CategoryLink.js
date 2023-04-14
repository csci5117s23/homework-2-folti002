import { useRouter } from "next/router";
import Link from "next/link";

// Provides a link to a category page
export default function CategoryLink({ href, name }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <Link href={href} onClick={handleClick}>
      <h1 className='title'>{name}</h1>
    </Link>
  );
}