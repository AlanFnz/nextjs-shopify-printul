import '@/styles/globals.css';

import LogoHeader from '@/components/common/LogoHeader';
import SocialLinks from '@/components/common/SocialLinks';
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
