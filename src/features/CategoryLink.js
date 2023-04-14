import { useRouter } from "next/router";
import Link from "next/link";

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