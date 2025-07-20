import { HTMLAttributes } from 'react';

import { bigCaslo } from '@/config/fonts';

interface Props {
  title: string;
  subtitle: string;
  className?: HTMLAttributes<HTMLLegendElement> | string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className ? className : ''} text-center md:text-left`}>
      <h3 className={`${bigCaslo.className} font-caslo text-[37px] mb-6`}>{title}</h3>
      <p className="text-sm font-semibold">{subtitle}</p>
    </div>
  )
}
