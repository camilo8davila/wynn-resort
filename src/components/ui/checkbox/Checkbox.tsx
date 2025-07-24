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
        'inline-flex items-center font-semibold text-base relative',
        {
          'text-error': error
        }
      )}
    >
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        htmlFor="login"
      >
        <input
          id={inputId}
          type="checkbox"
          name={id}
          ref={ref}
          {...props}
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-secondary checked:bg-secondary checked:before:bg-secondary hover:before:opacity-10"
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <IoCheckmarkSharp width={8} height={8} className='text-white' />
        </div>
      </label>
      <label
        className="mt-px cursor-pointer select-none font-light"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  )
})
