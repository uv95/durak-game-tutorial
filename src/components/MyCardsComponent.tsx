import React from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface IMyCardsComponentProps {
  cards: Card[];
  onStep: (card: Card) => void;
}

const MyCardsComponent: React.FC<IMyCardsComponentProps> = ({
  cards,
  onStep,
}) => {
  return (
    <div className="playerCards">
      {cards.map((card) => (
        <CardComponent key={card.id} card={card} onClick={() => onStep(card)} />
      ))}
    </div>
  );
};

export default MyCardsComponent;
