import { useRouter } from "next/router";

export default function HomePageRedirect() {
  const router = useRouter();
  router.push('/');
}