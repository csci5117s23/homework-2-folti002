import { useRouter } from "next/router";

// Redirect user to the home page to let them sign in
export default function HomePageRedirect() {
  const router = useRouter();
  router.push('/');
}