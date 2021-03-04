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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
      }}
      onClick={onClick}
    >
      <span
        style={{
          color: 'white',
        }}
      >
        {value}
      </span>
    </div>
  );
}
