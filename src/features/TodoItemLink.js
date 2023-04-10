import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function TodoItemLink({ href }) {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? 'red' : 'black',
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} style={style}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </Link>
  );
}