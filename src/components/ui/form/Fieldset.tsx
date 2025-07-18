import { HTMLAttributes } from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLLegendElement> | string;
}

export const Fieldset = ({ children, title, className }: Props) => {
  return (
    <fieldset className={`${className}`}>
      <legend className={`font-caslo text-[22px] underline underline-offset-8 mb-5`}>{title}</legend>
      {children}
    </fieldset>
  )
}
