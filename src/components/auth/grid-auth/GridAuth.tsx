interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export const GridAuth = ({ children }: Props) => {
  return (
    <div className="max-w-[630px] py-[60px] mx-auto">
      {children}
    </div>
  )
}
