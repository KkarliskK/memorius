import css from '../style/Profile.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';
import pfp from '../assets/pfp.png';
import { Crown, Medal, Tag } from "@phosphor-icons/react";

function Profile() {
    return (
        <>
            <img className={`absolute w-11/12 bottom-0 left-0 h-3/6 z-10 `} src={wave1} />
            <div className={`relative w-full h-5/6 flex items-center justify-center ${css.mainScreen}`}> 
                <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                <div className={`flex w-9/12 flex-col m-4 p-3 rounded shadow-lg justify-center items-center ${css.profileContainer}`}>
                    <div className={`flex w-full p-3 justify-center items-center flex-col ${css.pfpContainer}`}>
                        <img src={pfp} className={`${css.pfp}`} />
                        <h2 className={`text-3xl m-3`}>Admin</h2>
                    </div>
                    <div className={`flex`}>
                        <div>Name: Admin Admin</div>
                    </div>
                    <div className={`flex justify-center items-center w-full p-2 m-2`}><Tag size={30} /><h2 className={`text-xl`}>Tags: </h2>
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Speedrunner</div>
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Tryhard</div> {/**automate this later on */}
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>MVP</div>{/**add multiple designs later */}
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Early Supporter</div>
                        <div className={`flex p-1 m-1 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>Beast</div>
                    </div>  
                    <div className={`flex justify-evenly items-center w-10/12 m-3`}>
                        <div className={`flex flex-col items-center justify-center p-3 m-1 h-40 w-1/3 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>
                            <h2 className={`text-3xl m-2`}>Best Score</h2>
                            <h2 className={`flex justify-center items-center text-3xl w-full m-2`}><Crown size={36} />2859</h2>
                        </div>
                        <div className={`flex flex-col items-center justify-center p-3 m-1 h-40 w-1/3 bg-white rounded shadow-[0_0px_7px_-2px_rgba(0,0,0,0.7)] hover:shadow-[0_0px_8px_-2px_rgba(0,0,0,0.7)] transition-all ${css.tag}`}>
                            <h2 className={`text-3xl m-2`}>Best Level</h2>
                            <h2 className={`flex justify-center items-center text-3xl w-full m-2`}><Medal size={36} />Level 17</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;