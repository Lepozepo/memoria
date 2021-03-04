import { useState, useCallback, useEffect } from 'react';
import { shuffle, range, keyBy } from 'lodash';
import PlayArea from './components/PlayArea';
import Card from './components/Card';
import MismatchIndicator from './components/MismatchIndicator';

const deck = range(24).map((id) => ({
  id,
  value: id % 12
}));

export default function App() {
  const [cards, setCards] = useState(shuffle(deck));

  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [mismatch, setMismatch] = useState(false);

  const selectCard = useCallback((card) => {
    setSelected((prev) => {
      if (prev.length === 2) return [card.id];

      return [
        ...prev,
        card.id,
      ];
    });
  }, [setSelected]);

  useEffect(() => {
    if (selected.length < 2) {
      setMismatch(false);
      return;
    }

    const cardsById = keyBy(cards, 'id');
    const firstCard = cardsById[selected[0]];
    const secondCard = cardsById[selected[1]];

    if (firstCard.value === secondCard.value) {
      setMatched((prev) => ([
        ...prev,
        firstCard.id,
        secondCard.id,
      ]));
      setMismatch(false);

      return;
    }
    setMismatch(true);
  }, [cards, selected, setMismatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSelected((prev) => {
        if (prev.length === 2) {
          return [];
        }
        return prev;
      });
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [mismatch, setSelected]);

  return (
    <>
      <PlayArea>
        {cards.map((card, idx) => (
          <Card
            key={card.id}
            value={card.value}
            selected={selected.includes(card.id)}
            matched={matched.includes(card.id)}
            onClick={() => selectCard(card)}
          />
        ))}
      </PlayArea>
      {mismatch && (<MismatchIndicator />)}
    </>
  );
}
