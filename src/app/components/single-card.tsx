import { Cards } from "./app";
import "./single-card.css"

interface CardProps {
  card: Cards;
  handleChoice: (card: Cards) => void;
  flipped: Cards | boolean;
  disabled: boolean;
}

const SingleCard: React.FC<CardProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="cover"
        />
      </div>
    </div>
  );
};

export default SingleCard;
