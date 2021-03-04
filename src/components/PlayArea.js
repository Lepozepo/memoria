export default function PlayArea({ children } = {}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '25% 25% 25% 25%',
        width: '70vw',
        height: '90vh',
        margin: '5vh auto 0',
      }}
    >
      {children}
    </div>
  );
}
