import css from '../style/Landing.module.css';

function LandingPage() {

  return (
    <>
      <div className={`flex justify-center w-full min-h-full mt-32 ${css.mainContainer}`}>
        <div className={`w-full flex justify-center items-center flex-col`}>
            <h1 className={`font-bold text-7xl text-slate-100 text-center pt-3 header-landing`}>Welcome to
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 ${css.h1}`}>Memorius</span>
            </h1>
            <p className={`${css.p}`}>A simple card memory game. 
                Flip the cards and try to match two to gain score. 
                Beat highscores in <a href='#'>leaderboard</a>.
                Earn coins by compleating levels, buy custom cards and themes. 
                And a lot more, Start Now!
            </p>
            <button className={`p-3 m-4 ${css.createAccountButton}`}><p className={`w-full ${css.createAccountButtonText}`}>Create Account</p></button>
        </div>
      </div>
    </>
  )
}

export default LandingPage;
