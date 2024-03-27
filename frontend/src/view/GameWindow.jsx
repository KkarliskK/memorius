import React, { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import css from '../style/GameWindow.module.css';
import Data from '../components/DataCar.js';
import { useParams } from 'react-router-dom';
import { Eye, FastForward, Info, Question, Timer } from "@phosphor-icons/react";
import axios from 'axios';
import Cookies from 'js-cookie';


function GameWindow() {
    const [showInfo, setShowInfo] = useState(false);
    const handleMouseEnter = () => {
        setShowInfo(true);
    };
    const handleMouseLeave = () => {
        setShowInfo(false);
    };

    const [level, setLevel] = useState(1);
    const [totalPairs, setTotalPairs] = useState(4); // Default number of pairs for level 1
    const [cardsArray, setCardsArray] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [moves, setMoves] = useState(0);
    const [stopFlip, setStopFlip] = useState(false);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const [won, setWon] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerStarted, setTimerStarted] = useState(false);
    const [initialTime, setInitialTime] = useState(60); 

    const SCORE_PER_PAIR = 100; // Score earned per matched pair
    const SCORE_PER_MOVE = 10;   // Score deduction per move
    const COINS_PER_LEVEL = 50;   // Coins earned per completed level

    
    function calculateScore(movesMade, initialTime, timeLeft, matchedPairs) {
        const timeBonus = Math.max(0, timeLeft) * 0;  //fix this later on
        const movesPenalty = movesMade * SCORE_PER_MOVE;
        const pairsScore = matchedPairs * SCORE_PER_PAIR;
        return pairsScore - movesPenalty + timeBonus;
    }

    useEffect(() => {
        const initialTime = 60 - (level - 1) * 5; 
        setTimeLeft(initialTime);
        setInitialTime(initialTime);
        const numPairs = Math.min(level * 2, 20); 
        setTotalPairs(numPairs);
        generateCards(numPairs);
    }, [level]);

    useEffect(() => {
        if (matchedPairs === totalPairs) {
            setWon(true);
        }
    }, [matchedPairs, totalPairs]);

    function generateCards(numPairs) {
        const shuffledCards = shuffleCards(Data, numPairs * 2);
        setCardsArray(shuffledCards);
    }

    function shuffleCards(cards, numCards) {
        const shuffledCards = cards.slice(0, numCards);

        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        return shuffledCards;
    }

    function restartGame() { 
        setTimeout(() => { 
            const initialCards = shuffleCards(Data, 4); // Select 4 cards for the initial level
            setCardsArray(initialCards); 
            setMoves(0); 
            setFirstCard(null); 
            setSecondCard(null); 
            setWon(false); 
            setScore(0);
            setLevel(1);
        }, 1000); 
    }


    function nextLevel() {
        if (level < 20) { 
            setLevel(level + 1);
            setWon(false);
            setMoves(0);
            setMatchedPairs(0);
            setTimeout(() => { 
                const numPairs = Math.min((level + 1) * 2, 20); 
                generateCards(numPairs); 
            }, 1000); 
        } else {
            // Handle game completion for reaching level 20
        }
    }
    


    function handleSelectedCards(item) { 
        setTimerStarted(true);
        console.log(typeof item); 
        if (firstCard !== null && firstCard.id !== item.id) { 
            setSecondCard(item); 
        } else { 
            setFirstCard(item); 
        } 
    } 

    useEffect(() => {
        if (timerStarted && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            // Handle game over when time runs out
            setWon(false); // Game over
        }
    }, [timeLeft, timerStarted]);

    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray(prevArray => {
                    return prevArray.map(unit => {
                        if (unit.name === firstCard.name) {
                            return { ...unit, matched: true };
                        } else {
                            return unit;
                        }
                    });
                });
                setMatchedPairs(prevCount => prevCount + 1);
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 500);
            }
        }
    }, [firstCard, secondCard]);

    useEffect(() => {
        if (matchedPairs === totalPairs) {

            const levelScore = calculateScore(moves, initialTime, timeLeft, matchedPairs);
            const newTotalScore = totalScore + levelScore; // Accumulate the level score with the previous total score
            setTotalScore(newTotalScore);
            setCoins(COINS_PER_LEVEL);

            const username = Cookies.get('username');

            axios.get(`http://localhost:8000/api/user/${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            })
            .then(response => {
                const userId = response.data.id; 
    
                // Post level completion data
                axios.post(`http://localhost:8000/api/level/completed/${userId}`, {
                    level: level,
                    time: initialTime - timeLeft,
                    score: levelScore,
                    total_score: newTotalScore,
                    moves: moves
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                setTimerStarted(false);
                setWon(true);
    
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [matchedPairs, totalPairs]);
    
    
    

    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves(prevValue => prevValue + 1);
    }

    function resetGame(){
        restartGame();
    }

    return (
        <>
        <div className={`w-full flex items-center justify-center flex-col ${css.scoreBoard}`}>
            <div className={`p-2 flex items-center justify-center bg-white rounded ${css.sidebar}`}>
                <p className={`m-2`}>Level: {level}</p>
                <p className={`m-2`}>Time left: {timeLeft}</p>
                <p className={`m-2`}>Score: {calculateScore(moves, initialTime, timeLeft, matchedPairs)}</p>
                <p className={`m-2`}>Moves: {moves}</p>
                <button className={`m-2`} onClick={resetGame}>New Game</button>
            </div>
            <div className={`w-full flex items-center justify-center flex-col ${css.perkBoard}`}>
                <div className={`p-3 flex items-center justify-center bg-white rounded ${css.sidebar}`}>
                    <div className={`p-2 m-2 shadow-lg ${css.infoContainer}`} style={{ opacity: showInfo ? 1 : 0 }}>
                        <div className={`flex text-lg h-22`}><Info size={32} /><p> The timer perk will add you 10 seconds to complete level! Costs: 1000 coins.</p></div>
                        <div className={`flex text-lg h-22`}><Info size={32} /><p> The eye perk will show you all cards for 3 seconds to complete level! Costs: 1000 coins.</p></div>
                        <div className={`flex text-lg h-22`}><Info size={32} /><p> The forward perk will allow you to skip level! Costs: 20000 coins.</p></div>
                    </div>
                    <div className={`flex flex-col justify-center items-center rounded m-2 ${css.perkContainer}`}>
                        <button
                            className={`p-2 cursor-pointer ${css.perk}`}>
                            <Timer size={32} />
                        </button>
                        <h2>0</h2> {/*here will be perk count*/}
                    </div>
                    <div className={`flex flex-col justify-center items-center rounded m-2 ${css.perkContainer}`}>
                        <button
                            className={`p-2 cursor-pointer ${css.perk}`}>
                            <Eye size={32} />
                        </button>
                        <h2>0</h2> {/*here will be perk count*/}
                    </div>
                    <div className={`flex flex-col justify-center items-center rounded m-2 ${css.perkContainer}`}>
                        <button
                            className={`p-2 cursor-pointer ${css.perk}`}>
                            <FastForward size={32} />
                        </button>
                        <h2>0</h2> {/*here will be perk count*/}
                    </div>
                    <Question
                        className={`absolute top-0 right-0 cursor-pointer ${css.infoIcon}`}
                        size={20}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            </div>
        </div>
        <div className={`w-full min-h-[45vh] flex items-center justify-center flex-col ${css.mainScreen}`}>
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
                <div className={`flex items-center justify-center flex-col absolute p-3 rounded ${css.winningScreen}`}>
                    <h2 className={`text-xl`}>Congratulations! You completed level with a score of {calculateScore(moves, initialTime, timeLeft, matchedPairs)}.</h2>
                    <p className={`text-lg`}>Your time: {initialTime - timeLeft} seconds.</p>
                    <p className={`text-lg`}>Moves: {moves}</p>
                    <p className={`text-lg`}>Total score: {totalScore}</p>
                    <p className={`text-lg`}>Coins earned: {coins}</p>
                    <div className={`flex w-full`}>
                        <button className={`cursor-pointer p-1 m-2 ${css.gameButton}`} onClick={nextLevel}>Next Level</button>
                        <button className={`cursor-pointer p-1 m-2 ${css.resetButton}`} onClick={resetGame}>Restart Game</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default GameWindow;
