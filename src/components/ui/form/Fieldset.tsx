import { bigCaslo } from '@/config/fonts';
import { HTMLAttributes } from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLLegendElement> | string;
}

export const Fieldset = ({ children, title, className }: Props) => {
  return (
    <fieldset className={`${className ? className : ''}`}>
      <legend className={`${bigCaslo.className} font-thin text-[22px] underline underline-offset-8 mb-5`}>{title}</legend>
      {children}
    </fieldset>
  )
}
