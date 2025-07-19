import { HTMLAttributes } from 'react'

interface Props {
  title: string;
  subtitle: string;
  className?: HTMLAttributes<HTMLLegendElement> | string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className} text-center md:text-left`}>
      <h3 className="font-caslo text-[37px] mb-6">{title}</h3>
      <p className="text-sm font-semibold">{subtitle}</p>
    </div>
  )
}
