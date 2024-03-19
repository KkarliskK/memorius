import css from '../style/Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function Register() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPass, setRepeatPass] = useState('');
  const [repeatPassError, setRepeatPassError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const navigate = useNavigate();

  if (Cookies.get('token') != undefined) {
		navigate('/');
	}

  const register = e =>{
    e.preventDefault();

    if (password == undefined || password == ""){
        setPasswordError(true);
    } else {
        setPasswordError(false);
    }
    if (name == undefined || name == ""){
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (username == undefined || username == ""){
        setUsernameError(true);
    } else {
        setUsernameError(false);
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
    if (repeatPass == undefined || repeatPass == ""){
        setRepeatPasswordError(true);
    } else {
        setRepeatPasswordError(false);
    }
    if (repeatPass !== password){
      setRepeatPassError(true);
    } else {
      setRepeatPassError(false);
    }
    if(nameError && usernameError && passwordError && repeatPassError && mobileError){
      return;
    }
    axios
      .post('http://localhost:8000/api/register', {
        name: name,
        username: username,
        email: email,
        mobile: mobile,
        password: password,
      })
      .then(function (response) {
        Cookies.set('token', response.data.token);
        Cookies.set('username', username);
        navigate('/');
      })
      .catch(function (error){
          console.log(error);
      });
  }

    return (
      <>
      <div className={`flex justify-center items-center  ${css.mainContainer}`}>
        <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 `} src={wave1} />
        <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
        <div className={`flex flex-col items-center p-4 ${css.signupContainer}`}>
          <div className={`flex justify-center ${css.signupHead}`}>
            <h2 className={`${css.h2}`}>Sign Up into <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 ${css.h1}`}>Memorius</span></h2>
          </div>
          <div className={`${css.signupBody}`}>
            <form className={`flex flex-col justify-center items-center ${css.signupForm}`} onSubmit={register}>
              <div className={`flex justify-center ${css.signupSplit}`}>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label htmlFor='name'>Enter name:</label>
                  <input  
                    type='text'
                    id='name'
                    className={`p-1 ${css.inputField}`}
                    placeholder='e. g. John Doe'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  {nameError && <p className={css.error}>Name can't be empty.</p>}
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label htmlFor='username'>Enter username:</label>
                  <input 
                    type='text'
                    id='username'
                    className={`p-1 ${css.inputField}`}
                    placeholder='e. g. johndoe123'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  {usernameError && <p className={css.error}>Username can't be empty.</p>}
                </div>
              </div>
              <div className={`flex justify-center ${css.signupSplit}`}>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label htmlFor='email'>Enter email:</label>
                  <input 
                    type='text'
                    id='email'
                    className={`p-1 ${css.inputField}`}
                    placeholder='e. g. example@example.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {emailError && <p className={css.error}>Email can't be empty.</p>}
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label htmlFor='mobile'>Enter phone number:</label>
                  <input 
                    type='number'
                    id='mobile'
                    className={`p-1 ${css.inputField}`}
                    placeholder='(xxx) xxx-xxx-xx'
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                  />
                  {mobileError && <p className={css.error}>Phone Number can't be empty.</p>}
                </div>
              </div>
              <div className={`flex justify-center ${css.signupSplit}`}>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label htmlFor='password'>Enter password:</label>
                  <input 
                    type='password'
                    id='password'
                    className={`p-1 ${css.inputField}`}
                    placeholder='Must have at least 6 characters'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {passwordError && <p className={css.error}>Password can't be empty.</p>}
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label htmlFor='repeatPassword'>Repeat password:</label>
                  <input 
                    type='password'
                    id='repeatPassword'
                    className={`p-1 ${css.inputField}`}
                    placeholder='Repeat your password'
                    value={repeatPass}
                    onChange={e => setRepeatPass(e.target.value)}
                  />
                  {repeatPasswordError && <p className={css.error}>Repeat password field can't be empty.</p>}
                </div>
              </div>
              {repeatPassError && <p className={css.error}>Passwords does not match!</p>}
              <button className={`p-1 m-3 ${css.signupButton}`}><p className={`${css.signupButtonText}`}>Sign Up</p></button>
            </form>
            <div className={`p-1 m-2 flex justify-center items-center ${css.signupFooter}`}>
              <p>Already have an account? <Link to='/login'><strong>Sign In Here!</strong></Link></p>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default Register;