import React, { useEffect, useState } from 'react';
import css from '../style/Settings.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProfileSettings() {
    const [name, setName] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [resetPass, setResetPass] = useState(false);
    const {username} = useParams();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/user/${username}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                });
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
                setNewUsername(userData.username);
                setMobile(userData.mobile);
                setUserId(userData.id);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    const handleResetPassword = () => {
        setResetPass(true);
    };

    const handleSaveChanges = e =>{
        e.preventDefault();

        if (newUsername == undefined || newUsername == ""){
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
        if (name == undefined || name == ""){
            setNameError(true);
        } else {
            setNameError(false);
        }
        if (email == undefined || email == ""){
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        if (mobile == undefined || mobile == ""){
            setMobileError(true);
        } else {
            setMobileError(false);
        }
        if (!newPassword || !repeatPassword) {
            setPasswordError(true);
            
        }
    
        if(newPassword !== repeatPassword){
            setPasswordError(true);
            
        } else {
            setPasswordError(false);
        }
        if(nameError && usernameError && passwordError && emailError && mobileError){
            return;
        }
        
        axios
        .put(`http://localhost:8000/api/profile/update/${userId}`, {
            name: name,
            username: newUsername,
            email: email,
            mobile: mobile,
            password: newPassword,
        })
        .then(function (response) {
            setMsg(response.data.message);
            console.log(response);
            setResetPass(false);
        })
        .catch(function (error){
            console.log(error.response.data.error);
            setErrorMsg(error.response.data.error);
        });
    }

    if (resetPass){
        return (
            <>
                <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-4 ${css.errorText}`}>Reset Password</h1>
                <form className={`flex flex-col justify-center items-center w-full`}>
                    <div className={`flex flex-col w-2/5`}>
                        <label className={`m-1`}>Enter your new password:</label>
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            className={`p-2 m-1 ${css.input}`}
                        />
                    </div>
                    <div className={`flex flex-col w-2/5`}>
                        <label className={`m-1`}>Repeat your new password:</label>
                        <input 
                            type="password" 
                            value={repeatPassword} 
                            onChange={(e) => setRepeatPassword(e.target.value)} 
                            className={`p-2 m-1 ${css.input}`}
                        />
                    </div>
                    {passwordError && <p className={css.error}>Passwords are not matching.</p>}
                    <button onClick={handleSaveChanges} className={`p-2 m-2 ${css.resetPasswordButton}`}>Save Changes</button>
                    <button className={`p-2 m-2 ${css.passwordButton}`} onClick={handleResetPassword}>Cancel</button>
                    {msg && <p className={` ${css.success}`}>Password updated successfully!</p>}
                    {errorMsg && <p className={` ${css.error}`}>There was an error, try again later!</p>}
                </form>
            </>
        );
    }

    if (loading){
        return <>
            <div className={`relative w-full h-5/6 flex items-center justify-center ${css.mainScreen}`}>
                <div className={`flex flex-col w-3/5 h-4/5 items-center justify-center rounded z-10 shadow-lg ${css.errorScreen}`}>
                    <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-4 ${css.errorText}`}>Loading...</h1>
                </div>
            </div>
            </>
    }

    return (
        <>
            <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-3`}>Profile settings</h1>
            <form className={`flex flex-col items-center justify-center w-full`} >
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Change name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                    {nameError && <p className={css.error}>Name field can't be empty.</p>}
                </div>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Change username:</label>
                    <input 
                        type="text" 
                        value={newUsername} 
                        onChange={(e) => setName(e.target.value)} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                    {usernameError && <p className={css.error}>Username field can't be empty.</p>}
                </div>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Change email address:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                    {emailError && <p className={css.error}>Email field can't be empty.</p>}
                </div>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Change mobile:</label>
                    <input 
                        type="number" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                    {mobileError && <p className={css.error}>Mobile field can't be empty.</p>}
                </div>
                <div className={`flex flex-col w-2/5`}>
                    <button className={`p-2 m-2 ${css.passwordButton}`} onClick={handleResetPassword}>Change password</button>
                </div>
                <button onClick={handleSaveChanges} className={` ${css.saveButton}`}> Save changes </button>
                {msg && <p className={` ${css.success}`}>Profile updated successfully!</p>}
                {errorMsg && <p className={` ${css.error}`}>There was an error, try again later!</p>}
            </form>
        </>
    );
}

export default ProfileSettings;
