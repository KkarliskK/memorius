import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import css from '../style/GameWindow.module.css';
import Card from '../components/Card.jsx'; // Your Card component

function GameWindow() {
  const cardNumbers = Array.from({ length: 9 }, (_, i) => i + 1);
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (number) => {
    // Toggle the card's flipped state
    setFlippedCards((prevFlipped) =>
      prevFlipped.includes(number)
        ? prevFlipped.filter((n) => n !== number)
        : [...prevFlipped, number]
    );
  };

  return (
    <>
       <div className={`w-full h-screen flex items-center flex-col ${css.mainScreen}`}>
            <div className={`${css.gameScreenHead} w-full flex justify-center items-center h-32 m-3`}>
                <h1 className={`${css.levelH1}`}>Level 1</h1> {/* Put level data here later */}
                <p className={`${css.timer}`}>Timer: </p>
                <p className={`${css.score}`}>Score: </p>
            </div>
            <div className={`${css.gameWindow} grid-rows-3 grid-cols-3 h-2/3 w-2/3 grid gap-4`}>
                {cardNumbers.map((number) => (
                <ReactCardFlip
                    key={number}
                    isFlipped={flippedCards.includes(number)}
                    flipDirection="vertical"
                >
                    {/* Front of the card */}
                    <div
                        className={`flex bg-indigo-500 justify-center items-center rounded shadow-lg cursor-pointer h-full`}
                        onClick={() => handleCardClick(number)}
                    >
                        <h2>{number}</h2>
                    </div>

                    {/* Back of the card */}
                    <div
                        className={`flex bg-indigo-700 justify-center items-center rounded shadow-lg cursor-pointer h-full`}
                        onClick={() => handleCardClick(number)}
                    >
                        <p>Back content</p>
                    </div>
                </ReactCardFlip>
                ))}
            </div>
      </div>
    </>
  );
}

export default GameWindow;
