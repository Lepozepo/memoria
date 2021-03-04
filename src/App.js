import { useState, useCallback, useRef } from 'react';
import { shuffle, range } from 'lodash';
import PlayArea from './components/PlayArea';
import Card from './components/Card';

const deck = range(24).map((id) => ({
  id,
  value: id % 12
}));

export default function App() {
  const { current: cards } = useRef(shuffle(deck));

  const [selected, setSelected] = useState([]);

  const selectCard = useCallback((card) => {
    setSelected((prev) => {
      return [
        ...prev,
        card.id,
      ];
    });
  }, [setSelected]);

  return (
    <PlayArea>
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          value={card.value}
          selected={selected.includes(card.id)}
          onClick={() => selectCard(card)}
        />
      ))}
    </PlayArea>
  );
}
