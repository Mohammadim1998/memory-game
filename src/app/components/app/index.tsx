"use client";
import { useEffect, useState } from "react";
import SingleCard from "../single-card";

export interface Cards {
  src: string;
  matched: boolean;
  id: number;
}

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
const App = () => {
  const [cards, setCards] = useState<Cards[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Cards | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Cards | null>(null);

  const handleChoice = (card: Cards): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurn(0);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("Those cards match");
        restTurn();
      } else {
        console.log("Those cards do not match");
        restTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  const restTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>

      <div className="card-grid">
        {cards?.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
};

export default App;
