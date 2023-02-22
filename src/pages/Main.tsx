import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import BattleFieldComponent from '../components/BattleFieldComponent';
import DeckComponent from '../components/DeckComponent';
import GameOver from '../components/GameOver';
import HisCardsComponent from '../components/HisCardsComponent';
import MyActions from '../components/MyActions';
import MyCardsComponent from '../components/MyCardsComponent';
import { game, hisCards, myCards, battleField } from '../store';
import { Card } from '../types';

const Main = observer(() => {
  const startGame = () => {
    const { firstHisCards, firstMyCards } = game.startGame();
    hisCards.addCards(firstHisCards);
    myCards.addCards(firstMyCards);
  };

  const hisAction = () => {
    if (!game.isMyStep) {
      const battleFieldCards = [
        ...battleField.cards.his,
        ...battleField.cards.my,
      ];

      const hisJuniorCard = hisCards.defineCardForAction(battleFieldCards);

      if (hisJuniorCard) {
        battleField.addHisCard(hisJuniorCard);
      } else {
        battleField.clearBattleField(myCards, hisCards);
      }
    }
  };

  const clickMyCard = (card: Card) => {
    if (game.isMyStep) {
      const myStepCard = myCards.checkMyStep(card, [
        ...battleField.cards.his,
        ...battleField.cards.my,
      ]);
      if (myStepCard) {
        battleField.addMyCard(myStepCard);
      }
    }
  };

  const getCard = () => {
    myCards.addCards([...battleField.cards.his, ...battleField.cards.my]);
    game.toggleStep();
    game.setIsGetCard(true);
    battleField.clearBattleField(myCards, hisCards);
  };

  useEffect(startGame, []);

  useEffect(hisAction, [game.isMyStep]);

  return (
    <>
      <HisCardsComponent cards={hisCards.cards} />
      <BattleFieldComponent cards={battleField.cards} />
      <MyCardsComponent cards={myCards.cards} onStep={clickMyCard} />
      <DeckComponent
        cardBalance={game.deckCards.length}
        trump={game.trumpCard}
      />
      <MyActions
        isMyAttack={game.isMyAttack}
        onRepulsed={() => battleField.clearBattleField(myCards, hisCards)}
        onGetCard={getCard}
      />
      <GameOver
        isShow={
          !game.deckCards.length &&
          (!myCards.cards.length || !hisCards.cards.length)
        }
        isMyWin={!myCards.cards.length}
        onRestartGame={startGame}
      />
    </>
  );
});

export default Main;
