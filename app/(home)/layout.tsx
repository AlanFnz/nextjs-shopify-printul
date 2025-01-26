import '@styles/globals.css';

import { SiteHeader } from '@components/layout/site-header';
import { Dialog } from '@components/ui/dialog';
import { PosterViewer } from '@features/posters/poster-viewer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Dialog>
        <PosterViewer />
        <SiteHeader user={null} />
        {children}
      </Dialog>
    </>
  );
}
