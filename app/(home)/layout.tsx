import '@/styles/globals.css';

import PosterViewer from '@/features/posters/PosterViewer';
import { SiteHeader } from '@/components/layout/SiteHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PosterViewer />
      <SiteHeader user={null} />
      {children}
    </>
  );
}
