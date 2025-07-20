'use client'
import { useState } from 'react';

import * as actions from '@/actions/miscelanius/country';
import { useUiStore } from '@/store';

export const FormFooter = () => {
  const showLoading = useUiStore(state => state.showLoading)
  const [email, setEmail] = useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();
    showLoading(true, 'subscribing to newsletter')
    try {
      await actions.subscribeNewsLetter(email);
      showLoading(false);
      setEmail('')
    } catch (error) {
      console.log(error);
      showLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-2 border-background px-5 py-3 flex justify-around w-full md:w-[530px]">
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        type="text"
        className="outline-none"
        id="email-news"
        name="email-news"
      />
      <button type='submit' className="btn-secondary w-[220px]">
        JOIN THE NEWSLETTER
      </button>
    </form>
  )
}
