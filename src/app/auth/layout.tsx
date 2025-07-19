import { Metadata } from 'next';

import { Footer, TopMenu } from '@/components';

export const metadata: Metadata = {
  title: 'Auth',
  description: '',
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMenu />
      <main className="min-height max-w-7xl my-0 mx-auto px-2 md:px-0">
        <div>
          {children}
        </div>
      </main>
      <Footer />
    </>

  );
}