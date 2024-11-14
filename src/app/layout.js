'use client';
import { Appshell } from '@/components/__Appshell';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/__Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
