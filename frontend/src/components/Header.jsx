import css from '../style/Header.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(Cookies.get('token')));
    const navigate = useNavigate();
    const username = Cookies.get('username');

    useEffect(() => {
        setIsLoggedIn(Boolean(Cookies.get('token')));
    }, [Cookies.get('token')]);


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
        {isLoggedIn && (
          <>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
              <Link to={`/profile/${username}`}>
                Profile
              </Link>
            </div>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
              <Link to='/shop'>
                Shop
              </Link>
            </div>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
              <Link to='/gamewindow'>
                Play Now
              </Link>
            </div>
            <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
              <Link to='/settings'>
                Settings
              </Link>
            </div>
          </>
        )}
        <div className={`flex justify-center items-center p-0 flex w-1/3 ${css.headerElement}`}>
          {isLoggedIn ? (
            <Link to='/signout' >
              Sign Out
            </Link>
          ) : (
            <Link to='/login'>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
