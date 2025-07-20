import { GridAuth } from '@/components';
import React from 'react'

const loading = () => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-20 bg-[#ffffffcc] flex flex-col justify-center items-center"
    >
      <div className="loader"></div>
    </div>
  )
}

export default loading;