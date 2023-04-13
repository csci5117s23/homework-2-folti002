import { SignInButton } from "@clerk/nextjs";

export default function MySignInButton() {
  return (
    <div>
      <SignInButton mode="modal">
        <button className='button'>
          Sign In/Create Account
        </button>
      </SignInButton>
    </div>
  );
}