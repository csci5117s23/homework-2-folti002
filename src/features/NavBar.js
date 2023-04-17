import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

// Consistent nav bar across all pages
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

          {/* <a role='button' class='navbar-burger' aria-label='menu' aria-expanded='false' data-target='geoDoNavBar'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a> */}
        </div>

        {/* Navigation Buttons */}
        <div id='geoDoNavBar' className='navbar-menu is-active' style={{backgroundColor: '#f48c4c'}}>
          <div className='navbar-item'>
            <Link href='/todos' id='bright-hover' className='navbar-item'>
              Todos
            </Link>

            <Link href='/done' id='bright-hover' className='navbar-item'>
              Completed Todos
            </Link>
          </div>

          {/* Sign-in button or user button if signed in */}
          <div className='navbar-end'>
            <div className='navbar-item'>
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