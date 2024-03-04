import css from '../style/GameWindow.module.css';
import cardBack from '../assets/cardBack.png';

function Card({ item, handleSelectedCards, toggled, stopflip }) { 
  return ( 
      <div className={`${css.item} cursor-pointer shadow-lg`}> 
          <div className={toggled ? css.toggled : ""}> 
              <img className={css.face} src={item.img} alt="face" /> 
              <div 
                  className={`${css.back} flex justify-center items-center rounded`}
                  onClick={() => !stopflip && handleSelectedCards(item)} 
              > 
              <img src={cardBack} />
                  {" "} 
              </div> 
          </div> 
      </div> 
  ); 
} 

export default Card; 