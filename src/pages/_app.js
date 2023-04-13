import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import '../styles/styles.css';

const publicPages = ["/"];

export default function App({ Component, pageProps }) {
  // Get path name
  const { pathname } = useRouter();

  // Check if current route is a public page
  const isPublicPage = publicPages.includes(pathname);

  // If route is public, render, if not, redirect to sign in
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
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}