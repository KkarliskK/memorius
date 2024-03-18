import React, { useState } from 'react';
import css from '../style/Settings.module.css';

function OtherSettings() {
    
    return (
        <>
            <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-3`}>Other settings</h1>
            <form className={`flex flex-col items-center justify-center w-full`}>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Cheat:</label>
                    <input 
                        type="text" 
                        className={`p-2 m-1 ${css.input}`}
                    />
                </div>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Tag:</label>
                    <input 
                        type="email" 
                        className={`p-2 m-1 ${css.input}`}
                    />
                </div>
                <button type="submit" value="Submit" />
            </form>
        </>
    );
}

export default OtherSettings;
