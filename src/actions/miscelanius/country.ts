'use server';

import { SelectOption } from "@/components";
import { ServerActionResponse } from "@/utils/errot";

const url = process.env.URL_ENDPOINT;

export const getCountries = async (): Promise<ServerActionResponse<{data: SelectOption[]}>> => {
  try {
    const data = await fetch(`${url}/miscelanium/countries`, {
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
    const countries = await data.json();
    return {
      data: countries
    }
  } catch (error: any) {
    return {
      error: error?.message || 'Error server'
    }
  }
}

export const subscribeNewsLetter = async (email: string): Promise<ServerActionResponse<{ok: boolean}>> => {
  try {
    const data = await fetch(`${url}/miscelanium/subscribe-newsletter`, {
      method: 'POST',
      body: email,
      cache: 'no-cache',
      next: {
        revalidate: 0
      }
    });

    if (!data.ok) {
      const errorData = await data.json().catch(() => ({ message: `Error ${response.status}: ${response.statusText}` }));
      console.error('Error HTTP en Server Component:', data.status, errorData);
      return {
        error: errorData?.message || 'Error desconocido del servidor'
      }
    }

    const response = await data.json().catch(console.log);
    return response;
  } catch (error: any) {
    return {
      error: error?.message || 'Error in server'
    }
  }
}