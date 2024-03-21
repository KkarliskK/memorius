import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import css from '../style/Profile.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';


const Signout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(Cookies.get('token')));
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(Boolean(Cookies.get('token')));
    }, [Cookies.get('token')]);
    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return(
        <>
            <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 z-10 `} src={wave1} />
            <div className={`relative w-full h-5/6 flex items-center justify-center ${css.mainScreen}`}>
                <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                <div className={`flex w-2/5 h-3/5 z-10 rounded shadow-lg p-3 justify-center items-center flex-col bg-white `}>
                    <h2 className={`text-3xl m-3`}>Are you sure you want to Sign Out?</h2>
                    <div className={`flex justify-center items-center`}>
                        <button onClick={handleLogout} className={`p-2 m-2 ${css.signOutButton}`}>Yes, Sign Out</button>
                        <Link to='/' className={`p-2 m-2 ${css.cancelButton}`}>Cancel</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signout;