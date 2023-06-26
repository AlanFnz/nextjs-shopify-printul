import LogoHeader from '@/components/common/LogoHeader';
import "@/styles/globals.css"
import { Inter } from 'next/font/google';
import SocialLinks from '@/components/common/SocialLinks';
import { Providers } from '@/state/provider';
import PosterViewer from '@/features/posters/PosterViewer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mystery Pulse',
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

