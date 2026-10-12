"use client";
import { useEffect, useState } from "react";
import { cardImages } from "@/features/memory-game/mock/data";
import { INITIAL_TIME, PREVIEW_DURATION, FLIP_DELAY } from "@/features/memory-game/constant";
import { Cards, GameState } from "@/features/memory-game/types";
import { shuffleArray } from "@/features/memory-game/utils";

export const useMemoryGame = () => {
    const [cards, setCards] = useState<Cards[]>([]);
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<Cards | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<Cards | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [time, setTime] = useState<number>(INITIAL_TIME);
    const [gameState, setGameState] = useState<GameState>("playing");
    const [preview, setPreview] = useState<boolean>(true);

    const handleChoice = (card: Cards): void => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    const shuffleCards = () => {
        const shuffled = shuffleArray([...cardImages, ...cardImages]).map((c) => ({
            ...c,
            id: Math.random(),
        }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffled);
        setTurns(0);
        setTime(INITIAL_TIME);
        setGameState("playing");
        setDisabled(false);
        setPreview(true);
    };

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prev) => prev + 1);
        setDisabled(false);
    };

    // Preview before start game
    useEffect(() => {
        if (!preview) return;
        setDisabled(true);

        const timer = setTimeout(() => {
            setPreview(false);
            setDisabled(false);
        }, PREVIEW_DURATION);

        return () => clearTimeout(timer);
    }, [preview]);

    // This is for timer
    useEffect(() => {
        if (gameState !== "playing" || preview) return;

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setGameState("lost");
                    setDisabled(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameState, preview]);

    // Check if all cards are matched
    useEffect(() => {
        if (
            gameState === "playing" &&
            !preview &&
            cards.length > 0 &&
            cards.every((c) => c.matched)
        ) {
            setGameState("won");
            setDisabled(true);
        }
    }, [cards, gameState, preview]);

    // Logic of choice cards
    useEffect(() => {
        if (!choiceOne || !choiceTwo) return;
        setDisabled(true);

        if (choiceOne.src === choiceTwo.src) {
            setCards((prev) =>
                prev.map((c) =>
                    c.src === choiceOne.src ? { ...c, matched: true } : c
                )
            );
            resetTurn();
        } else {
            const timer = setTimeout(resetTurn, FLIP_DELAY);
            return () => clearTimeout(timer);
        }
    }, [choiceOne, choiceTwo]);

    // start game
    useEffect(() => {
        shuffleCards();
    }, []);

    return {
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
    };
};