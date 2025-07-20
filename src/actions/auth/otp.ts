'use server'

import { ServerActionResponse } from "@/utils/errot";

const url = process.env.URL_ENDPOINT;

export const sendOtpCode = async (body: { sendTo: "phone" | "email" | null, contact: string }): Promise<ServerActionResponse<{ ok: boolean }>> => {
  try {
    const data = await fetch(`${url}/auth/otp/send-otp-code`, {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-cache',
      next: {
        revalidate: 0
      }
    });

    if (!data.ok) {
      const errorData = await data.json().catch(() => ({ message: `Error ${data.status}: ${data.statusText}` }));
      console.error('Error HTTP en Server Component:', data.status, errorData);
      return {
        error: errorData?.message || 'Error in otp service'
      }
    }

    const otp = await data.json();
    return otp;
  } catch (error: any) {
    return {
      error: error?.message || 'Error in otp service'
    }
  }
}

export const verifyCode = async (body: { otp: string }): Promise<ServerActionResponse<{ ok: boolean }>> => {
  try {
    const data = await fetch(`${url}/auth/otp/verify-code`, {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-cache',
      next: {
        revalidate: 0
      }
    });

    if (!data.ok) {
      const errorData = await data.json().catch(() => ({ message: `Error ${data.status}: ${data.statusText}` }));
      console.error('Error HTTP en Server Component:', data.status, errorData);
      return {
        error: errorData?.message || 'Error creating user'
      }
    }

    const otp = await data.json();

    return otp;
  } catch (error: any) {
    return {
      error: error?.message || 'Error in validate otp service'
    }
  }
}