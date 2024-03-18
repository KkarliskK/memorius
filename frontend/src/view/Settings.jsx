import React, { useState } from 'react';
import css from '../style/Settings.module.css';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';
import ProfileSettings from '../components/ProfileSettings';
import GameSettings from '../components/GameSettings';
import OtherSettings from '../components/OtherSettings';

function Settings() {
    const [activeTab, setActiveTab] = useState('Profile');

    const renderTab = () => {
        switch(activeTab) {
            case 'Profile':
                return <ProfileSettings />;
            case 'Game':
                return <GameSettings />;
            case 'Other':
                return <OtherSettings />;
            default:
                return <ProfileSettings />;
        }
    }
    
    return (
        <>
            <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 z-10 `} src={wave1} />
            <div className={`relative w-full h-5/6 flex items-center justify-center ${css.mainScreen}`}> 
                <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
                <div className={`flex w-8/12 min-h-96 m-4 p-3 rounded shadow-lg items-center z-10 ${css.settingsContainer}`}>
                    <div className={`flex flex-col items-center w-2/5 h-full justify-center ${css.sidebar}`}>
                        <button className={`p-1 m-2 ${css.settingsButton}`} onClick={() => setActiveTab('Profile')}>Profile Settings</button>
                        <button className={`p-1 m-2 ${css.settingsButton}`} onClick={() => setActiveTab('Game')}>Game Settings</button>
                        <button className={`p-1 m-2 ${css.settingsButton}`} onClick={() => setActiveTab('Other')}>Other Settings</button>
                    </div>
                    <div className={`flex justify-evenly items-center w-4/5 h-full flex-col`}>
                        {renderTab()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;