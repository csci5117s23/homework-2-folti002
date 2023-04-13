import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <>
      <nav className='navbar top-bar' role='navigation'>

        {/* Logo */}
        <div className='navbar-brand'>
          <Link href='todos' id='bright-hover' className='navbar-item'>
            <Image 
              src='/GeoDoListLogo.png' 
              width={35} 
              height={100} 
              alt='GeoDo List logo'
            />
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div id='geoDoNavBar' className='navbar-item'>
          <div className='navbar-item'>
            <Link href='todos' id='bright-hover' className='navbar-item'>
              Todos
            </Link>

            <Link href='done' id='bright-hover' className='navbar-item'>
              Complete todos
            </Link>
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <SignedOut>
                <div className='buttons'>
                  <Link href='/' id='bright-hover' className='button is-light'>
                    Log in
                  </Link>
                </div>
              </SignedOut>
              <SignedIn>
                <div>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}