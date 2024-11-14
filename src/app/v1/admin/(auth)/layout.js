'use client';
import { AppShellAdmin } from '@/components/__AppshellAdmin';
import '../../../globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShellAdmin>{children}</AppShellAdmin>
      </body>
    </html>
  );
}
