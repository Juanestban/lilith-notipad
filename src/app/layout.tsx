import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { NoteProvider, SessionProvider } from '@lilith/contexts';
import { Wrapper } from '@lilith/config/Wrapper';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notipad - app notes',
  description:
    'Notipad, an application for create and save your notes using react, nextjs with typescript and mongo using mongoose for make the connection',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <main className="main-container">
          <SessionProvider>
            <NoteProvider>
              <Wrapper>{children}</Wrapper>
            </NoteProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
