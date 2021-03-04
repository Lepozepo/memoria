export default function MismatchIndicator() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90vw',
        height: 50,
        background: 'gray',
        opacity: 0.8,
        pointerEvents: 'none',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>Nope</span>
    </div>
  );
}
