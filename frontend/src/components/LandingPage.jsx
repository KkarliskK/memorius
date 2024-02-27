import css from '../style/Landing.module.css';

function LandingPage() {

  return (
    <>
        <div className={`w-2/4`}>
            <h1 className={`font-bold text-7xl text-slate-100 text-center pt-3 header-landing`}>Welcome to
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 ${css.h1}`}>Memorius</span>
            </h1>
        </div>
    </>
  )
}

export default LandingPage;
