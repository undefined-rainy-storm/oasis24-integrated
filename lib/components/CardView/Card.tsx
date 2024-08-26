export const Card = ({
  children, style
}: Readonly<{
  children?: React.ReactNode,
  style?: React.CSSProperties
}>) => {
  return (
    <div
      style={ style }
    >
      { children }
    </div>
  )
}
