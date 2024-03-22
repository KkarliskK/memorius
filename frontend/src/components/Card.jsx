import React, { useState, useEffect } from 'react';
import css from '../style/GameWindow.module.css';
import cardBack from '../assets/logo.png';
import audioSrc from '../assets/card_flip.mp3';

function Card({ item, handleSelectedCards, toggled, stopflip }) {

    const start = () => {
        if (!toggled && !stopflip) {
            let audio = new Audio(audioSrc);
            audio.play();
        }
    };


    return (
        <div className={`${css.item} cursor-pointer`} onClick={start}>
            <div className={toggled ? css.toggled : ""}>
                <img draggable="false" className={css.face} src={item.img} alt="face" />
                <div className={`${css.back} flex justify-center items-center rounded`} onClick={() => !stopflip && handleSelectedCards(item)} >
                    <img draggable="false" className={`w-5/6`} src={cardBack} alt="back" />
                </div>
            </div>
        </div>
    );
}

export default Card;
