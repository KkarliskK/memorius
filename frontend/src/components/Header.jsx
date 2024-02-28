import css from '../style/Header.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Header() {

  return (
    <>
        <div className={`w-full flex bg-white p-2 ${css.header}`}>
            <div className={`flex justify-center p-3 flex w-1/3 ${css.headerElement}`}>
                <Link to='/leaderboard'>
                    Leaderboard
                </Link> 
            </div>
            <div className={`flex justify-center p-3 flex w-1/3 ${css.headerElement}`}>
                <Link to='/profile'>
                    Profile
                </Link>
            </div>
            <div className={`flex justify-center p-3 flex w-1/3 ${css.headerElement}`}>
                <Link to='/menu'>
                    Menu
                </Link>
            </div>
        </div>
    </>
  );
}

export default Header;