import '@/styles/globals.css';

import LogoHeader from '@/components/layout/LogoHeader';
import SocialLinks from '@/components/layout/SocialLinks';
import PosterViewer from '@/features/posters/PosterViewer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PosterViewer />
      <LogoHeader />
      <SocialLinks />
      {children}
    </>
  );
}
