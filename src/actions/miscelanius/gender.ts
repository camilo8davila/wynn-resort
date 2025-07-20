'use server';

import { SelectOption } from '@/components';
import { ServerActionResponse } from '@/utils/errot';

const url = process.env.URL_ENDPOINT;

export const getGenders = async (): Promise<ServerActionResponse<{ data: SelectOption[] }>> => {
  try {
    const data = await fetch(`${url}/miscelanium/genders`, {
      method: 'GET',
      cache: 'force-cache',
    });

    if (!data.ok) {
      const errorData = await data.json().catch(() => ({ message: `Error ${data.status}: ${data.statusText}` }));
      console.error('Error HTTP en Server Component:', data.status, errorData);
      return {
        error: errorData?.message || 'Error server'
      }
    }

    const genders = await data.json();
    return {
      data: genders
    }
  } catch (error: any) {
    return {
      error: error?.message || 'Error server'
    }
  }
}