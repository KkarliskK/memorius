import css from '../style/GameWindow.module.css';
import cardBack from '../assets/cardBack.png';
import audio from '../assets/card_flip.mp3';

let sweep = new Audio(audio);

function Card({ item, handleSelectedCards, toggled, stopflip }) {
    const start = () => {
        if (!toggled && !stopflip) {
            sweep.play();
        }
    };

    return (
        <div className={`${css.item} cursor-pointer`}>
            <div onClick={start} className={toggled ? css.toggled : ""}>
                <img draggable="false" className={css.face} src={item.img} alt="face" />
                <div
                    className={`${css.back} flex justify-center items-center rounded`}
                    onClick={() => !stopflip && handleSelectedCards(item)}
                >
                    <img draggable="false" src={cardBack} alt="back" />
                </div>
            </div>
        </div>
    );
}

export default Card;
