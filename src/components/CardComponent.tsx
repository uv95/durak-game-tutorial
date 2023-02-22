import React from 'react';
import { Card } from '../types';

interface ICardComponentProps {
  card: Card;
  onClick?: () => void;
}

const CardComponent: React.FC<ICardComponentProps> = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={card.img} alt="card" width="80" />
    </div>
  );
};

export default CardComponent;
