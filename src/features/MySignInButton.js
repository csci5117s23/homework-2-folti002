import { SignInButton, SignUpButton } from '@clerk/nextjs';

// Simple Clerk-powered sign in button
export default function MySignInButton() {
  return (
    <div>
      <SignInButton mode='modal'>
        <button className='button'>
          Sign In 
        </button>
      </SignInButton>
      <SignUpButton mode='modal'>
        <button className='button'>
          Create Account
        </button>
      </SignUpButton>
    </div>
  );
}