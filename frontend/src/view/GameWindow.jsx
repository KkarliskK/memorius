import { useState, useEffect, useRef } from 'react';
import css from '../style/GameWindow.module.css';
import Card from '../components/Card.jsx';
import Data from '../components/DataCar.js';
import backgroundMusic from '../assets/background_music.mp3';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';

//https://sfxr.me/  <-- sound generator

function GameWindow() {
    const [cardsArray, setCardsArray] = useState([]);  
    const [timer, setTimer] = useState(60);
    const [moves, setMoves] = useState(0); 
    const [firstCard, setFirstCard] = useState(null); 
    const [secondCard, setSecondCard] = useState(null); 
    const [stopFlip, setStopFlip] = useState(false);  
    const [won, setWon] = useState(0); 
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false); //when winning
    const [lostGame, setLostGame] = useState(false); //when losing
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0); // total score for all levels
    const [coins, setCoins] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [nextLevelClicked, setNextLevelClicked] = useState(false); // Track if next level button is clicked

    const timerId = useRef(); 
    const audioRef = useRef(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (audioRef.current) {
          audioRef.current.muted = !audioRef.current.muted;
        }
    };

    function NewGame() {
        clearInterval(timerId.current);
        setNextLevelClicked(false); // Reset next level click state
        // Reset all game state variables
        setCardsArray([]);
        setMoves(0);
        setFirstCard(null);
        setSecondCard(null);
        setTimer(60);
        setGameOver(false);
        setLostGame(false);
        setWon(0);
        setScore(0);
        setCoins(0);
        setLevel(1);
        setTotalScore(0); // Reset total score
        startNewLevel();
    }


    function nextLevel() {
        // Disable next level button to prevent spamming
        setNextLevelClicked(true);
        setLevel(level + 1);
        startNewLevel();
    }

    function startNewLevel() {
        const maxCards = 20;
        const maxTimer = 160;
    
        let cardsPerRow;
        let timerValue;
    
        if (level === 1) {
            // For the first level, start with 4 cards and 160 seconds
            cardsPerRow = 2;
            timerValue = 160;
        } else {
            // For subsequent levels, adjust based on level number
            if (level % 2 === 0) {
                cardsPerRow = 4 + Math.floor((level - 2) / 2);
                timerValue = maxTimer - (level - 2) * 5;
            } else {
                cardsPerRow = 4 + Math.floor((level - 3) / 2);
                timerValue = maxTimer - (level - 3) * 5;
            }
        }
    
        // Ensure the number of cards doesn't exceed the maximum
        cardsPerRow = Math.min(cardsPerRow, Math.floor(maxCards / 2)); // Divide by 2 because each card has a pair
        // Ensure the timer value doesn't go below 0
        timerValue = Math.max(timerValue, 0);
    
        const totalCards = cardsPerRow * 2; // Since each row has 2 cards
        const randomOrderArray = Data.slice(0, totalCards).sort(() => 0.5 - Math.random());
    
        setCardsArray(randomOrderArray);
        setMoves(0);
        setFirstCard(null);
        setSecondCard(null);
        setTimer(timerValue); // Start timer only when the first card is interacted with
        setGameOver(false);
        setLostGame(false);
        setWon(0);
        setScore(0);
        setCoins(0);
    }




    function startCountdown() {
        timerId.current = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(timerId.current);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    }


    const [levelScore, setLevelScore] = useState(0);
    
    useEffect(() => {
        if (timer === 0) {
            // Set score to 0 when timer runs out
            setScore(0);
            setCoins(0);
            setLostGame(true);
            clearInterval(timerId.current);
        } else if (cardsArray.length > 0 && won === cardsArray.length / 2) {
            // Calculate the level score when the level is completed
            const baseScore = 1000; // Base score for completing a level
            const scorePerSecond = 10; // Score awarded per remaining second
            const remainingTime = 160 - timer; // Calculate remaining time (160 is the maximum time)
            const levelScore = baseScore + remainingTime * scorePerSecond; // Calculate the level score
    
            // Update the total score
            setTotalScore((prevTotalScore) => prevTotalScore + levelScore);
    
            // Set the level score and other relevant states
            setScore(levelScore);
            setCoins(Math.round(levelScore * 0.3)); // Calculate coins earned based on the level score
            setGameOver(true);
            clearInterval(timerId.current);
        }
        // Clear the interval when the game is over
        if (gameOver) {
            clearInterval(timerId.current);
        }

        // Start countdown if the timer is not running and a first card is selected
        if (firstCard && !timerId.current && timer === 60) {
            startCountdown();
        }
    }, [timer, won, cardsArray, gameOver, firstCard]);
    
  
    //funkcija kas saglaba nospiesto pirmo karti un otro karti
    function handleSelectedCards(item) {
        if (!gameOver) {
            if (firstCard !== null && firstCard.id !== item.id) {
                setSecondCard(item);
            } else {
                setFirstCard(item);
                // Start the countdown when the first card is clicked
                if (timer === 60) {
                    startCountdown();
                }
            }
        }
    }
    
  
      //winning screen
      function winningScreen() {
        if (gameOver) {
            return (
                <div className={`absolute top-52 p-4 flex justify-center items-center flex-col w-1/3 h-2/5 rounded-md text-center bg-white shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] ${css.winningScreen}`}>
                    <h1 className={`text-3xl m-2`}>Congratulations! You won in {moves} moves!</h1>
                    <p className={`text-xl m-2`}>Your score: {score}</p>
                    <p className={`text-xl m-2`}>Your total score: {totalScore}</p>
                    <p className={`text-xl m-2`}>Your time: {60 - timer} seconds</p>
                    <p className={`text-xl m-2`}>Coins earned: {coins}</p>
                    <button className={`p-3 m-3 ${css.nextLevel}`} onClick={nextLevel}><p className={`${css.nextLevelText}`}>Next Level</p></button>
                </div>
            );
        }
    }

      //game over screen
    function lostGameScreen(){
      if (lostGame) {
        return (
          <div className={`absolute top-52 p-4 flex justify-center items-center flex-col w-1/3 h-2/5 rounded-md text-center bg-white shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] ${css.winningScreen}`}>
                <h1 className={`text-3xl m-2`}>Level Failed!</h1>
                <p className={`text-xl m-2`}>Your total score: {totalScore}</p>
                <p className={`text-xl m-2`}>Your time: {60 - timer} seconds</p>
                <p className={`text-xl m-2`}>Coins earned: {coins}</p>
                <button className={`p-3 m-3 ${css.nextLevel}`} onClick={NewGame}><p className={`${css.nextLevelText}`}>New Game</p></button>
            </div>
        );
    }
    }

    //parbauda vai nospiestas kartis sakrit vai ne, ja sakrit tad nonem iespeju vinas apgriezt apkart, ja nesakrit tad apgriež atpakaļ
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
                setWon((preVal) => preVal + 1);
                removeSelection();
                // Check if both cards were matched on the first try
                if (firstCard.firstTry && secondCard.firstTry) {
                    // Award time and score bonus for combo
                    setTimer((prevTimer) => prevTimer + 5); // Add 5 seconds to the timer
                    setScore((prevScore) => prevScore + 10); // Add 10 points to the score
                }
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 500);
            }
        }
    }, [firstCard, secondCard]);
    
    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevValue) => prevValue + 1);
    }

    //when clicked next level button
    function nextLevel() {
        setLevel(level + 1);
        setTotalScore(totalScore + levelScore); // Update total score only when moving to the next level
        startNewLevel();
    }
    
    function startNewGame() {
        const updatedCardsArray = cardsArray.map(card => ({ ...card, firstTry: true }));
        setCardsArray(updatedCardsArray);
    }
    
    useEffect(() => {
        NewGame();
    }, []);

  return (
    <>
    <audio ref={audioRef} src={backgroundMusic} autoPlay loop></audio>
       <div className={`w-full h-screen flex items-center flex-col ${css.mainScreen}`}>
            <div className={`${css.gameScreenHead} w-full flex justify-center items-center h-32 m-3`}>
                <h1 className={`${css.levelH1} font-bold text-xl m-2`}>Level: {level}</h1> 
                <p className={`${css.timer} font-semibold text-xl m-2`}>Timer: {timer}</p>
                <p className={`${css.score} font-semibold text-xl m-2`}>Score: {totalScore}</p> {/* Put score for each guessed card pair  That means make a score system first of all*/}

                {won !== 6 ? ( 
                <div className={`${css.movesBox} text-xl m-2 font-semibold`}>Moves : {moves}</div> 
            ) : ( 
                <div className={`${css.winningScreen}`}> 
                    You Won in {moves} moves 
                </div> 
            )} 
            <button className={`${css.newGame} p-3 m-3`} onClick={NewGame}> 
                <p className={`${css.nextLevelText}`}>New Game</p> 
            </button> 
            <button onClick={togglePlay}>
                {isPlaying ?  <SpeakerHigh size={32} />: <SpeakerSlash size={32} />}
            </button>
            </div>
            {winningScreen()}
            {lostGameScreen()}
            <div className={`bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] ${css.gameWindow}`}> 
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
      </div>
    </>
  );
}

export default GameWindow;
