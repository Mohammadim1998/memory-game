export interface Cards {
  id?: number;
  src: string;
  matched: boolean;
}

export interface CardProps {
  card: Cards;
  handleChoice: (card: Cards) => void;
  flipped: Cards | boolean;
  disabled: boolean;
}

export type GameState = "playing" | "won" | "lost";