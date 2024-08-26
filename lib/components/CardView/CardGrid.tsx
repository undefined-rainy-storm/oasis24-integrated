export const CardGrid = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      overflow: 'auto',
    }}>
      <div className="grid grid-cols-4 gap-4" style={{
        display: 'flex',
        position: 'relative',
        overflow: 'auto',
        boxSizing: 'border-box',
        gap: 10,
      }}>
        { children }
      </div>
    </div>
  )
}
