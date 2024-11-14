'use client';
import { Appshell } from '@/components/__Appshell';
import '../globals.css';
import Footer from '@/components/__Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Appshell />
        {children}
        <Footer />
      </body>
    </html>
  );
}
