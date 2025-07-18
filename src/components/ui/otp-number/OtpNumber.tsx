'use client';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

interface Props {
  length: number;
  initValue: number;
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

  return (
    <div className='flex items-center justify-center gap-3'>
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
              'w-20 h-20 rounded-lg border-[1.5px] font-semibold text-5xl text-center ',
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
