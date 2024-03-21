import { useState } from 'react';
import css from '../style/GameWindow.module.css';
import cardBack from '../assets/logo.png';
import audioSrc from '../assets/card_flip.mp3';

function Card({ item, handleSelectedCards, toggled, stopflip }) {
    const [firstTry, setFirstTry] = useState(true);

    const start = () => {
        if (!toggled && !stopflip) {
            let audio = new Audio(audioSrc);
            audio.play();
        }
    };

    const handleClick = () => {
        if (!stopflip) {
            handleSelectedCards(item);
            setFirstTry(false); // Update firstTry state when the card is clicked
        }
    };

    return (
        <div className={`${css.item} cursor-pointer`}>
            <div onClick={start} className={toggled ? css.toggled : ""}>
                <img draggable="false" className={css.face} src={item.img} alt="face" />
                <div
                    className={`${css.back} flex justify-center items-center rounded`}
                    onClick={handleClick}
                >
                    <img draggable="false" className={`w-5/6`} src={cardBack} alt="back" />
                </div>
            </div>
        </div>
    );
}

export default Card;
