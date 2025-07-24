'use client';
import clsx from 'clsx';
import { ChangeEvent, ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

interface Props {
  length: number;
  initValue: string;
  onChange: (code: string) => void
  error?: boolean
}

export const OtpNumber = ({ length, initValue, onChange, error }: Props) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[] | null>([]);

  useEffect(() => {
    if (inputRefs.current?.length !== 0) {
      inputRefs.current![0].focus();
    }
  }, []);

  const setInputRef = (element: HTMLInputElement | null, index: number) => {
    if (element) {
      inputRefs.current![index] = element;
    }
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isNaN(value as any)) return;
    const newOtp = [...otp];
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Submit trigger
    const combineOtp = newOtp.join('');
    onChange(combineOtp);

    // Move to next Input
    if (value && index < length - 1 && inputRefs.current![index + 1]) {
      inputRefs.current![index + 1].focus()
    }
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current![index - 1]) {
      inputRefs.current![index - 1].focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const value = event.clipboardData.getData('text');

    if (isNaN(value as any)) return;
    console.log('pasamos validacion de nuemros');
    const newOtp = [...otp];

    `${value}`.split('').forEach((currentNumber, index) => {
      newOtp[index] = currentNumber;
    });
    setOtp(newOtp);

    // Submit trigger
    const combineOtp = newOtp.join('');
    onChange(combineOtp);

    // Move focus at the last position
    inputRefs.current![length - 1].focus()
  }

  return (
    <div className='flex items-center justify-center gap-3' onPaste={e => handlePaste(e)}>
      {
        otp.map((value, index) => (
          <input
            ref={(el) => setInputRef(el, index)}
            key={`${index}`}
            type="number"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={clsx(
              `w-15 h-15 sm:w-20 sm:h-20 rounded-lg border-[1.5px] font-semibold text-5xl text-center `,
              {
                "border-error text-error": error,
                "border-primary text-primary": !error
              }
            )}
          />
        ))
      }
    </div>
  )
}
