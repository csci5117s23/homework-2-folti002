import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';
import Link from 'next/link';

// Returns a dynamic link to a todo item
export default function TodoItemLink({ href }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} >
      <FontAwesomeIcon icon={faPenToSquare} style={{color: "#3a527f"}}/>
    </Link>
  );
}