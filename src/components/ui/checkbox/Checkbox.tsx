import clsx from 'clsx';
import { forwardRef, HTMLAttributes, InputHTMLAttributes, ReactNode, useId } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  containerClassName?: HTMLAttributes<HTMLLegendElement> | string;
  children: ReactNode | string
}

export const Checkbox = forwardRef<HTMLInputElement, Props>((
  {
    containerClassName,
    children,
    id,
    error,
    ...props
  },
  ref
) => {
  const uniqueId = useId();
  const inputId = id || `custom-input-${uniqueId}`;

  return (
    <div
      className={clsx(
        'font-semibold text-base relative',
        {
          'text-error': error
        }
      )}
    >
      <IoCheckmarkSharp width={8} height={8} className='text-white absolute left-0' />
      <label htmlFor={id}>
        <input
          id={inputId}
          type="checkbox"
          className="appearance-none w-4 h-4 bg-white rounded border-white outline checked:bg-secondary"
          name={id}
          ref={ref}
          {...props}
        />
        &nbsp; &nbsp; {children}
      </label>
    </div>
  )
})
