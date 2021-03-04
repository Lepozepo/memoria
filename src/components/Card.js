export default function Card(props = {}) {
  const {
    value,
    onClick = () => {},
    selected = false,
    matched = false,
  } = props;

  return (
    <div
      style={{
        background: selected ? 'gray' : 'black',
        padding: '2px',
        margin: '2px',
        position: 'relative',
        borderRadius: '20px',
        opacity: matched ? 0 : 1,
        transition: 'all 150ms ease-in',
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
            transform: 'translate(-50%, -50%)',
            fontSize: 40,
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}
