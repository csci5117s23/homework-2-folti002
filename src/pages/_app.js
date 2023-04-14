import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import HomePageRedirect from '@/features/HomePageRedirect';
import '../styles/styles.css';

const publicPages = ["/"];

// Renders the app wrapped in a ClerkProvider to force
// sign-in when certain pages are reached
export default function App({ Component, pageProps }) {
  // Get path name
  const { pathname } = useRouter();

  // Check if current route is a public page
  const isPublicPage = publicPages.includes(pathname);

  // If route is public, render, if not and user not signed in, redirect to sign in
  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <HomePageRedirect />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}