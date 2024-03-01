import css from '../style/Header.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {

  return (
    <>
        <div className={`w-full flex bg-white p-2 ${css.header}`}>
            <div className={`flex justify-center p-0 flex w-1/3 ${css.headerElement}`}>
                <Link to='/'>
                    <img className={`${css.logo}`} src={logo} />
                </Link> 
            </div>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
                <Link to='/leaderboard'>
                    Leaderboard
                </Link> 
            </div>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
                <Link to='/profile'>
                    Profile
                </Link>
            </div>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
                <Link to='/login'>
                    Sign In
                </Link>
            </div>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
                <Link to='/#'>
                    Coming soon
                </Link>
            </div>
        </div>
    </>
  );
}

export default Header;