import '@/styles/globals.css';

import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { Providers } from '@/lib/providers';
import { Toaster } from '@/components/ui/Toaster';

export const metadata = {
  title: 'Morning Art Club',
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
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

