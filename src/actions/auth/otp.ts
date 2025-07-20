'use server'

const url = process.env.URL_ENDPOINT;

export const sendOtpCode = async (body: { sendTo: "phone" | "email" | null, contact: string }) => {
  const data = await fetch(`${url}/auth/otp/send-otp-code`, {
    method: 'POST',
    body: JSON.stringify(body),
    cache: 'no-cache'
  });
  const otp = await data.json();

  return otp;
}

export const verifyCode = async (body: { otp: string }) => {
  const data = await fetch(`${url}/auth/otp/verify-code`, {
    method: 'POST',
    body: JSON.stringify(body),
    cache: 'no-cache'
  });
  const otp = await data.json();

  return otp;
}