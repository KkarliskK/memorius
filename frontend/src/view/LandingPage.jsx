import { Link } from 'react-router-dom';
import css from '../style/Landing.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';

function LandingPage() {

  return (
    <>
      <div className={`relative flex justify-center w-full ${css.mainContainer}`}>
        <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 `} src={wave1} />
        <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
        <div className={`w-full flex justify-center items-center flex-col mb-20`}>
            <h1 className={`font-bold text-7xl text-slate-100 text-center pt-3 header-landing`}>Welcome to
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 ${css.h1}`}>Memorius</span>
            </h1>
            <p className={`${css.p}`}>A simple card memory game. 
                Flip the cards and try to match two to gain score. 
                Beat highscores in <Link className={`text-teal-300`} to='/leaderboard'>leaderboard</Link>.
                Buy custom cards and themes in the shop with coins.
                You can earn coins by completing levels! 
                And a lot more, Start Now!
            </p>
            <Link className={`p-3 m-4 ${css.link}`} to='/register'>
              <p className={`w-full ${css.createAccountButtonText}`}>Create Account</p>
            </Link>
        </div>
      </div>
    </>
  )
}

export default LandingPage;
