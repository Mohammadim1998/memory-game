import { Cards } from "@/features/memory-game/types";

interface CardProps {
  card: Cards;
  handleChoice: (card: Cards) => void;
  flipped: boolean;
  disabled: boolean;
}

const SingleCard: React.FC<CardProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className="relative w-full aspect-square transform-3d">
      {/* Front Of The Card */}
      <img
        className={`absolute inset-0 w-full h-full block rounded-md border-2 border-white transition-all duration-200 ease-in backface-hidden ${flipped
            ? "transform-[rotateY(0deg)] delay-200"
            : "transform-[rotateY(90deg)] delay-0"
          }`}
        src={card.src}
        alt="card front"
      />
      {/* Back Of The Card */}
      <img
        className={`absolute inset-0 w-full h-full block rounded-md border-2 border-white transition-all duration-200 ease-in backface-hidden ${flipped
            ? "transform-[rotateY(90deg)] delay-0"
            : "transform-[rotateY(0deg)] delay-200"
          }`}
        src="/images/cover.png"
        onClick={handleClick}
        alt="cover"
      />
    </div>
  );
};

export default SingleCard;