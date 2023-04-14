import { SignInButton } from '@clerk/nextjs';

// Simple Clerk-powered sign in button
export default function MySignInButton() {
  return (
    <div>
      <SignInButton mode='modal'>
        <button className='button'>
          Sign In/Create Account
        </button>
      </SignInButton>
    </div>
  );
}