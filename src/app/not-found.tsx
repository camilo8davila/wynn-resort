import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-secondary px-2 text-sm rounded rotate-12 absolute text-white">
        Page Not Found
      </div>
      <button className="mt-5 btn-primary p-">
        <div
          className="relative inline-block text-sm font-medium"
        >

          <span className="relative block">
            <Link href="/">Go Home</Link>
          </span>
        </div>
      </button>
    </main>
  )
}