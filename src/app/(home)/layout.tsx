import { Footer, TopMenu } from "@/components";

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMenu />
      <main >
        <div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}