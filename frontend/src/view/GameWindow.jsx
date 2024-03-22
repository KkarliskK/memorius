import React, { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import css from '../style/GameWindow.module.css';
import Data from '../components/DataCar.js';

function GameWindow() {
    const [cardsArray, setCardsArray] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [moves, setMoves] = useState(0); 
    const [stopFlip, setStopFlip] = useState(false);  
    const [score, setScore] = useState(0);
    const [won, setWon] = useState(false);
    const [level, setLevel] = useState(1);
    const [matchedPairs, setMatchedPairs] = useState(0); 
    const [totalPairs, setTotalPairs] = useState(Math.min(level * 2, 20));

    function shuffleCards(cards, numCards) {
        // Create a copy of the original cards array
        const shuffledCards = cards.slice(0, numCards);
        
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        return shuffledCards;
    }

    useEffect(() => {
        const numCards = Math.min(level * 4, 20);
        const shuffledCards = shuffleCards(Data, numCards);
        setCardsArray(shuffledCards);
        setTotalPairs(numCards / 2); // Calculate total pairs
    }, [level]);

    function restartGame() { 
        setTimeout(() => { 
            const randomOrderArray = Data.sort(() => 0.5 - Math.random()); 
            setCardsArray(randomOrderArray); 
            setMoves(0); 
            setFirstCard(null); 
            setSecondCard(null); 
            setWon(false); 
            setScore(0);
            setLevel(1);
        }, 1000); 
    } 

    function nextLevel() { 
        setTimeout(() => { 
            const randomOrderArray = Data.sort(() => 0.5 - Math.random()); 
            setCardsArray(randomOrderArray); 
            setMoves(0); 
            setFirstCard(null); 
            setSecondCard(null); 
            setWon(false); 
            setScore(0);
            setLevel(1);
        }, 1000); 
    } 


    function handleSelectedCards(item) { 
        console.log(typeof item); 
        if (firstCard !== null && firstCard.id !== item.id) { 
            setSecondCard(item); 
        } else { 
            setFirstCard(item); 
        } 
    } 

    useEffect(() => { 
        if (firstCard && secondCard) { 
            setStopFlip(true); 
            if (firstCard.name === secondCard.name) { 
                setCardsArray((prevArray) => { 
                    return prevArray.map((unit) => { 
                        if (unit.name === firstCard.name) { 
                            return { ...unit, matched: true }; 
                        } else { 
                            return unit; 
                        } 
                    }); 
                }); 
                setMatchedPairs((prevCount) => prevCount + 1); // Increment matched pairs
                removeSelection(); 
            } else { 
                setTimeout(() => { 
                    removeSelection(); 
                }, 1000); 
            } 
        } 
    }, [firstCard, secondCard, totalPairs, matchedPairs]); 

    useEffect(() => {
        if (matchedPairs === totalPairs) { //here it checks if all cards have been matched to setWin
            setWon(true);
        }
    }, [matchedPairs, totalPairs]);
    

    function removeSelection() { 
        setFirstCard(null); 
        setSecondCard(null); 
        setStopFlip(false); 
        setMoves((prevValue) => prevValue + 1); 
    } 

    function resetGame(){
        restartGame();
    }

    return (
        <div className={`w-full h-screen flex items-center justify-center flex-col ${css.mainScreen}`}>
            <div className={`flex items-center justify-center bg-white rounded ${css.sidebar}`}>
                <p>Level: {level}</p>
                <p>Time left: </p>
                <p>Total Score: </p>
                <p>Moves: {moves}</p>
                <button onClick={resetGame}>New Game</button>
            </div>
            <div className={`rounded bg-white ${css.gameWindow}`}>
                { 
                    cardsArray.map((item) => ( 
                        <Card 
                            item={item} 
                            key={item.id} 
                            handleSelectedCards={handleSelectedCards} 
                            toggled={ 
                                item === firstCard || 
                                item === secondCard || 
                                item.matched === true
                            } 
                            stopflip={stopFlip} 
                        /> 
                    )) 
                } 
            </div>
            {won && (
                <div className={`flex items-center justify-center ${css.winningScreen}`}>
                    Congratulations! You won with a score of {score}.
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
}

export default GameWindow;
