import { Card } from '../types';

abstract class PlayerCards {
  abstract cards: Array<Card>;

  reduceCard(id: number): void {
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  addCards(cards: Array<Card>): void {
    this.cards = [...this.cards, ...cards];
  }

  clearCards(): void {
    this.cards = [];
  }
}

export default PlayerCards;
