import Image from 'next/image'
import Link from 'next/link'

export const TopMenu = () => {
  return (
    <nav className="px-5 w-full bg-white">
      <div className='flex justify-between items-center h-31 max-w-desktop my-0 mx-auto'>
        {/* logo */}
        <div>
          <Image
            src="/wynn/logo-header.svg"
            alt="wynn-logo"
            width={161}
            height={78}
          />
        </div>

        {/* Center menu */}
        <div className="hidden xl:block">
          <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-semibold uppercase text-sm" href="/auth/login">Rooms & Suites</Link>
          <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-semibold uppercase text-sm" href="/auth/login">Wynn Rewards</Link>
          <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-semibold uppercase text-sm" href="/auth/login">Offers</Link>
          <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-semibold uppercase text-sm" href="/auth/login">Dining</Link>
          <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-semibold uppercase text-sm" href="/auth/login">Entertainment</Link>
          <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-semibold uppercase text-sm" href="/auth/login">Meetings & Events</Link>
        </div>

        {/* Search, Cart, Menu */}
        <div className="flex items-center">

          <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 flex text-sm font-semibold">
            EN
            <Image
              src="/icons/down-arrow.svg"
              alt="down-arrow"
              width={7}
              height={4}
              className='ml-1.5'
            />
          </button>

          <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 flex text-sm font-semibold xl:hidden cursor-pointer">
            Menu
          </button>

        </div>
      </div>
    </nav>
  )
}
