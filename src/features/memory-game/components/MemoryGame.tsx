"use client";
import SingleCard from "@/features/memory-game/components/singleCard";
import { useMemoryGame } from "@/features/memory-game/hooks/useMemoryGame";
import { formatTime } from "@/features/memory-game/utils";

const MemoryGame = () => {
  const {
    cards,
    turns,
    choiceOne,
    choiceTwo,
    disabled,
    time,
    gameState,
    preview,
    shuffleCards,
    handleChoice,
  } = useMemoryGame();

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">بازی حافظه محصولات باسلام</h1>

      <div className="flex gap-4 mb-6">
        <div className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg text-xl">
          ⏱ {formatTime(time)}
        </div>
        <div className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg text-xl">
          تلاش: {turns}
        </div>
      </div>

      <button
        onClick={shuffleCards}
        className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg mb-6 hover:bg-blue-100 transition"
      >
        بازی جدید
      </button>

      {preview && (
        <p className="text-2xl text-yellow-400 font-bold mb-4">
          👀 کارت‌ها رو حفظ کن...
        </p>
      )}
      {!preview && gameState === "won" && (
        <p className="text-2xl text-green-400 font-bold mb-4">
          🎉 شما برنده شدید
        </p>
      )}
      {!preview && gameState === "lost" && (
        <p className="text-2xl text-red-400 font-bold mb-4">
          ⏰ زمان تموم شد
        </p>
      )}

      <div className="grid grid-cols-4 gap-3 max-w-3xl w-full">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              preview ||
              card === choiceOne ||
              card === choiceTwo ||
              card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;