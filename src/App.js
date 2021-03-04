import { useState, useCallback, useEffect } from 'react';
import { shuffle, range, keyBy } from 'lodash';
import PlayArea from './components/PlayArea';
import Card from './components/Card';
import MismatchIndicator from './components/MismatchIndicator';

const NUM_CARDS = 24;

const deck = range(NUM_CARDS).map((id) => ({
  id,
  value: id % (NUM_CARDS / 2),
}));

export default function App() {
  const [cards, setCards] = useState(shuffle(deck));

  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [mismatch, setMismatch] = useState(false);
  const [finished, setFinished] = useState(false);

  const selectCard = useCallback((card) => {
    setSelected((prev) => {
      if (prev.includes(card.id)) return prev;
      if (matched.includes(card.id)) return prev;
      if (prev.length === 2) return [card.id];

      return [
        ...prev,
        card.id,
      ];
    });
  }, [setSelected, matched]);

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
    }, 3000); // NOTE: Difficulty setting?

    return () => clearTimeout(timeoutId);
  }, [setSelected]);

  useEffect(() => {
    if (matched.length === cards.length) {
      setFinished(true);
    }
  }, [matched, cards, setFinished]);

  if (finished) {
    return (
      <>
        <p>Yay!</p>
        <button
          onClick={() => {
            // Ideally we could move this logic into a reducer but this works
            setSelected([]);
            setMismatch(false);
            setMatched([]);
            setCards(shuffle(deck));
            setFinished(false);
          }}
        >
          Reset
        </button>
      </>
    );
  }

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
