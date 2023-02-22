import { action, makeObservable, observable } from 'mobx';
import { Card, TypeCard } from '../types';
import { cards as allCards } from '../cards';

class Game {
  trumpCard: TypeCard = TypeCard.bubi;
  isMyStep: boolean = false;
  isGetCard: boolean = false;
  isMyAttack: boolean = false;
  deckCards: Array<Card> = [];
  attackCard: Card = allCards[0];

  constructor() {
    makeObservable(this, {
      isMyStep: observable,
      isGetCard: observable,
      isMyAttack: observable,
      deckCards: observable,
      attackCard: observable,
      toggleStep: action,
      toggleAttack: action,
      reduceCards: action,
      mixDeck: action,
      startGame: action,
    });
  }

  toggleStep() {
    this.isMyStep = !this.isMyStep;
  }
  toggleAttack() {
    this.isMyAttack = !this.isMyAttack;
  }

  //setter
  setIsGetCard(isGetCard: boolean) {
    this.isGetCard = isGetCard;
  } //взял ли карты (не смог отбиться)

  setAttackCard(card: Card) {
    this.attackCard = card;
  }

  defineStep(myCards: Card[], hisCards: Card[]) {
    const myJuniorTrumpRank = this.defineJuniorTrumpCard(myCards);
    const hisJuniorTrumpRank = this.defineJuniorTrumpCard(hisCards);

    if (myJuniorTrumpRank) {
      if (myJuniorTrumpRank < hisJuniorTrumpRank || !hisJuniorTrumpRank) {
        this.toggleStep();
        this.toggleAttack();
      }
    }
  } // определить чей ход первый

  mixDeck() {
    this.deckCards = this.deckCards.sort(() => Math.random() - 0.5);
    this.trumpCard = this.deckCards[this.deckCards.length - 1].type;
  }

  startGame() {
    this.deckCards = allCards;
    this.mixDeck();

    const firstHisCards = this.reduceCards(6);
    const firstMyCards = this.reduceCards(6);

    this.defineStep(firstMyCards, firstHisCards);

    return { firstHisCards, firstMyCards };
  }

  addPlayerCards(my: any, his: any) {
    const myNeed = 6 - my.cards.length;
    const hisNeed = 6 - his.cards.length;
    my.addCards(this.reduceCards(myNeed > 0 ? myNeed : 0));
    his.addCards(this.reduceCards(hisNeed > 0 ? hisNeed : 0));
  }

  defineJuniorTrumpCard(cards: Card[]) {
    const trumpRanks = cards
      .filter((card) => card.type === this.trumpCard)
      .map((card) => card.rank);

    if (trumpRanks.length) return Math.min(...trumpRanks);

    return 0;
  }

  reduceCards(countCards: number): Array<Card> {
    const removedCards = this.deckCards.splice(0, countCards);
    return removedCards; //карты взятые с колоды
  }
}

export default Game;
