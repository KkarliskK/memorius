import css from '../style/GameWindow.module.css';
import cardBack from '../assets/cardBack.png';

function Card({ item, handleSelectedCards, toggled, stopflip }) { 
  return ( 
      <div className={`${css.item} cursor-pointer`}> 
          <div className={toggled ? css.toggled : ""}> 
              <img draggable="false" className={css.face} src={item.img} alt="face" /> 
              <div 
                  className={`${css.back} flex justify-center items-center rounded`}
                  onClick={() => !stopflip && handleSelectedCards(item)} 
              > 
              <img draggable="false" src={cardBack} />
                  {" "} 
              </div> 
          </div> 
      </div> 
  ); 
} 

export default Card; 