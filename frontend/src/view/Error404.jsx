import { Link } from 'react-router-dom';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';
import css from '../style/Error.module.css';


function Error404() {
    return (
        <>
           <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 `} src={wave1} />
            <div className={`relative w-full h-5/6 flex items-center justify-center flex-col`}>
                <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                <div className={`flex p-3 rounded flex-col justify-center items-center h-2/4 ${css.errorContainer}`}>
                    <h1 className={`text-6xl font-semibold m-5`}>Error 404</h1>
                    <h2 className={`text-3xl m-5`}>Page not found ;(</h2>
                    <Link className={`p-3 m-4 ${css.link}`} to='/'>
                        <p className={`w-full ${css.backButtonText}`}>Return to landing page</p>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Error404;