import React, { useState, useEffect, useRef } from 'react';
import css from '../style/GameWindow.module.css';
import Card from '../components/Card.jsx';
import Data from '../components/DataLanguages.js';

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
    const [lostGame, setLostGame] = useState(false); //when loosing
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0); // kopejais score par visiem limeniem
    const [highScore, setHighScore] = useState(0); // augstakais rezultats
    const [coins, setCoins] = useState(0);
    const timerId = useRef(); 

    function NewGame() { 
        setTimeout(() => { 
            const randomOrderArray = Data.slice(0, (level + 4) * 2).sort(() => 0.5 - Math.random()); // Slice the Data array to get 'level + 5' pairs
            setCardsArray(randomOrderArray); 
            setMoves(0); 
            setFirstCard(null); 
            setSecondCard(null); 
            setTimer(60);
            setGameOver(false);
            setLostGame(false);
            setWon(0); 
            setScore(0);
            setCoins(0);
        }, 1200); 
    }
    

    function nextLevel(){
        setLevel(prevLevel => {
            const newLevel = prevLevel + 1; // Increase the level
            setTotalScore(totalScore + score);
            setTimeout(() => {
                const randomOrderArray = Data.slice(0, (newLevel + 4) * 2).sort(() => 0.5 - Math.random()); // Slice the Data array based on the new level
                setCardsArray(randomOrderArray);
                setMoves(0);
                setFirstCard(null); 
                setSecondCard(null); 
                setTimer(60);
                setGameOver(false);
                setLostGame(false);
                setWon(0); 
                setCoins(0);
            }, 1200);
            return newLevel;
        });
    }
    
    
  
    //funkcija kas saglaba nospiesto pirmo karti un otro karti
    function handleSelectedCards(item) { 
      console.log(typeof item); 
      if (firstCard !== null && firstCard.id !== item.id) { 
          setSecondCard(item); 
      } else { 
          setFirstCard(item); 
          // Start the countdown when the first card is clicked
          if (firstCard === null && timer === 60) {
              startCountdown();
          }
      } 
    } 
  
    function startCountdown() {
      timerId.current = setInterval(() => { // Use .current to access the timerId
          setTimer((prevTimer) => {
              if (prevTimer <= 1) {
                  clearInterval(timerId.current); // Use .current to access the timerId
                  return 0;
              }
              return prevTimer - 1;
          });
      }, 1000);
    }
      
      useEffect(() => {
          if (timer === 0) {
            setScore(timer * 4); //jo vairak laika palicis uz taimera, jo lielaks score. 4 - koeficients
            setCoins(score * 0.5); // jo lielaks score, jo lielaku naudu nopelni, 0.5 = /2, vnk lai nevar tik atri nopelnit naudu
            setLostGame(true);  
          }
      }, [timer]);
  
      useEffect(() => {
        if (cardsArray.length > 0 && won === cardsArray.length / 2) {
            clearInterval(timerId.current); 
            setScore(4 * timer); 
            setCoins(4 * timer * 0.5); 
            setTotalScore(totalScore + 4 * timer);
            setGameOver(true); 
        }
    }, [won, cardsArray]);
  
      //winning screen
      function winningScreen() {
        if (gameOver) {
            return (
                <div className={`absolute top-52 p-4 flex justify-center items-center flex-col w-1/3 h-2/5 rounded-md text-center ${css.winningScreen}`}>
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
          <div className={`absolute top-52 p-4 flex justify-center items-center flex-col w-1/3 h-2/5 rounded-md text-center ${css.winningScreen}`}>
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
            } else { 
                setTimeout(() => { 
                    removeSelection(); 
                }, 1000); 
            } 
        } 
    }, [firstCard, secondCard]); 
  
    //tad kad kartis nospiestas un nesakrit, notira pirmo un otro karšu datus saglabatos
    function removeSelection() { 
        setFirstCard(null); 
        setSecondCard(null); 
        setStopFlip(false); 
        setMoves((prevValue) => prevValue + 1); 
    } 

    //when clicked next level button
    function nextLevel() {
      setLevel(level + 1);
      NewGame();
    }

    function newGame(){
      NewGame();
    }
 
    useEffect(() => { 
        NewGame(); 
    }, []); 

  return (
    <>
       <div className={`w-full h-screen flex items-center flex-col ${css.mainScreen}`}>
            <div className={`${css.gameScreenHead} w-full flex justify-center items-center h-32 m-3`}>
                <h1 className={`${css.levelH1} font-bold text-xl m-2`}>Level: {level}</h1> 
                <p className={`${css.timer} font-semibold text-xl m-2`}>Timer: {timer}</p>
                <p className={`${css.score} font-semibold text-xl m-2`}>Score: {score}</p> {/* Put score for each guessed card pair  That means make a score system first of all*/}

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
            </div>
            {winningScreen()}
            {lostGameScreen()}
            <div className={`${css.gameWindow}`}> 
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
