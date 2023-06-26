import '@/styles/globals.css';
import { Inter } from 'next/font/google';

import LogoHeader from '@/components/common/LogoHeader';
import SocialLinks from '@/components/common/SocialLinks';
import PosterViewer from '@/features/posters/PosterViewer';

import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { Providers } from '@/state/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mystery Pulse',
  authors: [
    {
      name: 'AlanFnz',
      url: 'https://github.com/AlanFnz',
    },
  ],
  creator: 'AlanFnz',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          <PosterViewer />
          <LogoHeader />
          <SocialLinks />
          {children}
        </Providers>
      </body>
    </html>
  );
}

