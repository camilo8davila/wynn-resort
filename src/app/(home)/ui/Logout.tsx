'use client'

import * as actions from '@/actions';

export const Logout = () => {
  const handleLogout = async () => {
    await actions.logout();
  }

  return (
    <button onClick={handleLogout} type="button" className='btn-primary'>
      LOGOUT
    </button>
  )
}
