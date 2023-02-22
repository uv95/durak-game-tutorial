import React from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface IHisCardsComponentProps {
  cards: Card[];
}

const HisCardsComponent: React.FC<IHisCardsComponentProps> = ({ cards }) => {
  return (
    <div className="playerCards">
      {cards.map((card) => (
        <CardComponent key={card.id} card={card} />
      ))}
    </div>
  );
};

export default HisCardsComponent;
