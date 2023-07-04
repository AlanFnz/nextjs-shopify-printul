import '@/styles/globals.css';

import PosterViewer from '@/features/posters/PosterViewer';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Dialog } from '@/components/ui/Dialog';

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
