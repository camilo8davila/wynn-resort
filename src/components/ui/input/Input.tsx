import { forwardRef, InputHTMLAttributes, useId } from 'react';

import './input.css'
import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({
    helperText,
    error = false,
    errorMessage,
    className = '',
    containerClassName = '',
    id,
    type = 'text',
    ...props
  }: Props,
    ref
  ) => {
    const uniqueId = useId();
    const inputId = id || `custom-input-${uniqueId}`;

    return (
      <div className={clsx(
        `custom-input-container w-full h-[60px] bg-white border-[1.5px] border-border-gray rounded-sm focus:border-transparent focus:ring-0 ${containerClassName ? containerClassName : ''}`,
        {
          'error-container': error
        }
      )}>
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`custom-input-field outline-none w-full h-full px-5 py-[18px] bold font-semibold text-base placeholder:text-base placeholder:text-placeholder-dark focus:border-transparent focus:ring-0 ${error ? 'error-input' : ''} ${className}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {/* Help or error Text */}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="helper-text custom-input-helper-text relative mb-2">
            {helperText}
          </p>
        )}
        {error && errorMessage && (
          <p id={`${inputId}-error`} className="helper-text custom-input-error-message error-input relative mb-2">
            {errorMessage}
          </p>
        )}
      </div>
    )
  })
