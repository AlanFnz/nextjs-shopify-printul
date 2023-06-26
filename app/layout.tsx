import LogoHeader from '@/components/common/LogoHeader';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import SocialLinks from '@/components/common/SocialLinks';
import { Providers } from '@/state/provider';
import PosterViewer from '@/features/posters/PosterViewer';

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
      <body className={inter.className}>
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

