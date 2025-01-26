import Link from 'next/link';

import { siteConfig } from '@config/site';
import { MainNav } from '@components/layout/main-nav';
import { CartSheet } from '@components/cart/cart-sheet';
import { buttonVariants } from '@components/ui/button';

// will take the user as prop when implemented
interface SiteHeaderProps {
  user: null;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <MainNav items={siteConfig.mainNav} />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <CartSheet />
            <Link href='/#'>
              <div
                className={buttonVariants({
                  size: 'sm',
                })}
              >
                Sign In
                <span className='sr-only'>Sign In</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
