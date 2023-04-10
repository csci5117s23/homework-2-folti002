import { ClerkProvider } from '@clerk/nextjs';
import '../styles/styles.css';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}