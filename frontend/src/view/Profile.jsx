import css from '../style/Profile.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';


function Profile() {
    return (
        <>
            <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 `} src={wave1} />
            <div className={`relative w-full h-5/6 flex items-center justify-center${css.mainScreen}`}> 
                <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                <div className={`flex w-full ${css.profileContainer}`}>
                    <div className={`flex w-full ${css.pfpContainer}`}>
                        <img src={pfp} />
                    </div>
                    <h2>Username</h2>
                </div>
                <div className={`flex w-full ${css.aboutContainer}`}>
                    <h2>Best score: </h2>
                    <h2>Tags: </h2>
                </div>
            </div>
        </>
    );
}

export default Profile;