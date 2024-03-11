import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';

function Error404() {
    return (
        <>
            <div className={`w-full h-5/6 flex items-center justify-center flex-col ${css.mainScreen}`}>
                <div className={`flex`}>
                    <h1>Error 404</h1>
                    <h2>Page not found ;(</h2>
                    <button>back to landing page</button>
                </div>
            </div>
        </>
    );
}

export default Error404;