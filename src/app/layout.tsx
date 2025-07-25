import type { Metadata } from 'next';

import { Sidebar } from '@/components/ui/sidebar/Sidebar';
import { avenirLt, bigCaslo } from '@/config/fonts';

import './globals.css';
import "../../node_modules/flag-icons/css/flag-icons.min.css";
import { Loader } from '@/components/ui/loader/Loader';

export const metadata: Metadata = {
  title: {
    template: '%s - Wynn resorts',
    default: 'Home'
  },
  description: "Luxury hotel in Dubai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${avenirLt.className}`}
      >
        <Sidebar />
        {children}
        <Loader />
        <div id="tooltip-root"></div>
      </body>
    </html>
  );
}
