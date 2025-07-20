'use client'
import clsx from 'clsx';

import { useUiStore } from '@/store';
import { IoBedOutline, IoBusinessOutline, IoCameraOutline, IoCloseOutline, IoFastFoodOutline, IoRibbonOutline, IoSearchOutline, IoTrophyOutline } from 'react-icons/io5';
import Link from 'next/link';

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeMenu = useUiStore(state => state.closeSideMenu);

  return (
    <div>
      {/* blackbaground */}
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />
        )
      }

      {/* Blur */}
      {
        isSideMenuOpen && (
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            onClick={() => closeMenu()}
          />
        )
      }

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[250px] sm:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
          onClick={() => closeMenu()}
        >
          <IoBedOutline size={30} />
          <span className='ml-3 text-xm'>Rooms & Suites</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
          onClick={() => closeMenu()}
        >
          <IoTrophyOutline size={30} />
          <span className='ml-3 text-xm'>Wynn Rewards</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
          onClick={() => closeMenu()}
        >
          <IoRibbonOutline size={30} />
          <span className='ml-3 text-xm'>Offers</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
          onClick={() => closeMenu()}
        >
          <IoFastFoodOutline size={30} />
          <span className='ml-3 text-xm'>Dining</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
          onClick={() => closeMenu()}
        >
          <IoCameraOutline size={30} />
          <span className='ml-3 text-xm'>Entertainment</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
          onClick={() => closeMenu()}
        >
          <IoBusinessOutline size={30} />
          <span className='ml-3 text-xm'>Meetings & Events</span>
        </Link>

      </nav>
    </div>
  )
}
