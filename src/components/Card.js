export default function Card(props = {}) {
  const {
    value,
    onClick = () => {},
    selected = false,
  } = props;

  return (
    <div
      style={{
        background: selected ? 'gray' : 'black',
        padding: '2px',
        margin: '2px',
        position: 'relative',
        borderRadius: '20px',
      }}
      onClick={onClick}
    >
      {selected && (
        <span
          style={{
            color: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}
