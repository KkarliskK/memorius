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
    const [bio, setBio] = useState('');
    const [pfp, setPfp] = useState('');
    const {username} = useParams();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [pfpError, setPfpError] = useState('');
    const [bioError, setBioError] = useState('');
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
                setBio(userData.bio);
                setPfp(userData.pfp);
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


    const handleSaveChanges = e =>{
        e.preventDefault();

        if (bio == undefined || bio == ""){
            setBioError(true);
        } else {
            setBioError(false);
        }
        if (pfp == undefined || pfp == ""){
            setPfpError(true);
        } else {
            setPfpError(false);
        }
        if(bioError && pfpError){
            return;
        }
        
        axios
        .put(`http://localhost:8000/api/profile/update/${userId}`, {
            name: name,
            username: newUsername,
            email: email,
            mobile: mobile,
            bio: bio,
            pfp: pfp,
            password: newPassword,
        })
        .then(function (response) {
            setMsg(response.data.message);
            console.log(response);
        })
        .catch(function (error){
            console.log(error.response.data.error);
            setErrorMsg(error.response.data.error);
        });
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
            <h1 className={`font-bold text-5xl text-center pt-3 header-landing m-3`}>Other settings</h1>
            <form className={`flex flex-col items-center justify-center w-full`} >
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Change profile picture:</label>
                    <input 
                        type="text" 
                        value={pfp} 
                        onChange={(e) => setPfp(e.target.value)} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                    {pfpError && <p className={css.error}>Profile picture field can't be empty.</p>}
                </div>
                <div className={`flex flex-col w-2/5`}>
                    <label className={`m-1`}>Change bio:</label>
                    <input 
                        type="text" 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        className={`p-2 m-1 ${css.input}`}
                    />
                    {bioError && <p className={css.error}>Bio field can't be empty.</p>}
                </div>
                <button onClick={handleSaveChanges} className={` ${css.saveButton}`}> Save changes </button>
                {msg && <p className={` ${css.success}`}>Profile updated successfully!</p>}
                {errorMsg && <p className={` ${css.error}`}>There was an error, try again later!</p>}
            </form>
        </>
    );
}

export default ProfileSettings;
