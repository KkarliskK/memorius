import React, { useState } from 'react';
import css from '../style/Settings.module.css';

function ProfileSettings() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically update the user's profile in your app's backend
        console.log(`Name: ${name}, Email: ${email}`);
    }

    return (
        <>
            <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-3`}>Profile settings</h1>
            <form className={`flex flex-col items-center justify-center w-full`} onSubmit={handleSubmit}>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={handleNameChange} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                </div>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                </div>
                <button type="submit" value="Submit" />
            </form>
        </>
    );
}

export default ProfileSettings;
