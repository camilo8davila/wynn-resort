'use client'
import { useUiStore } from '@/store';

export const Loader = () => {
  const isLoading = useUiStore(state => state.isLoading);
  const message = useUiStore(state => state.message);

  if (!isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-20 bg-[#ffffffcc] flex flex-col justify-center items-center"
    >
      {
        message && (
          <p className='text-lg text-black-dark'>{message}</p>
        )
      }
      <div className="loader"></div>
    </div>
  )
}
