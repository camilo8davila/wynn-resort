interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export const GridAuth = ({ children }: Props) => {
  return (
    <div className="max-w-[630px] my-[60px] mx-auto">
      {children}
    </div>
  )
}
