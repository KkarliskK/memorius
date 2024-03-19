import css from '../style/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


function Login() {

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      if(Cookies.get('token') !== undefined){
        navigate('/');
      }
    };
    checkLoginStatus(); 
  }, [navigate]);

  const login = e =>{
    e.preventDefault();

    if (password == undefined || password == ""){
        setPasswordError(true);
    } else {
        setPasswordError(false);
    }
    if (username == undefined || username == ""){
        setUsernameError(true);
    } else {
        setUsernameError(false);
    }
    if(usernameError && passwordError){
        return;
    }
    axios
      .post('http://localhost:8000/api/login', {
        username: username,
        password: password,
      })
      .then(function (response) {
        Cookies.set('token', response.data.token);
        Cookies.set('username', username);
        navigate('/');
      })
      .catch(function (error){
        console.log(error.response.data.error);
        setErrorMsg(error.response.data.error);
      });
  }

    return (
      <>
      <div className={`flex justify-center items-center ${css.mainContainer}`}>
        <img className={`absolute w-4/5 bottom-0 left-0 h-2/6 `} src={wave1} />
        <img className={`absolute w-4/5 top-0 right-0 rotate-180 ${css.wave2}`} src={wave2} />
        <div className={`flex flex-col items-center p-4 ${css.signinContainer}`}>
          <div className={`flex justify-center ${css.signinHead}`}>
            <h2 className={`${css.h2}`}>Sign In into <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 ${css.h1}`}>Memorius</span></h2>
          </div>
          <div className={`${css.signinBody}`}>
            <form className={`flex flex-col justify-center items-center ${css.signinForm}`} onSubmit={login}>
              <div className={`flex justify-center flex-col ${css.signinSplit}`}>
                <div className={`flex flex-col m-3 ${css.inputBox}`}>
                  <label htmlFor='username'>Enter username:</label>
                  <input 
                    type='text'
                    id='username'
                    className={`p-2 ${css.inputField}`}
                    placeholder='e. g. johndoe123'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  {usernameError && <p className={css.error}>Username can't be empty.</p>}
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label htmlFor='password'>Enter password:</label>
                  <input 
                    type='password'
                    id='password'
                    className={`p-2 ${css.inputField}`}
                    placeholder='Must have at least 6 characters'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {passwordError && <p className={css.error}>Password can't be empty.</p>}
                  {errorMsg && <p className={css.error}>Invalid username or password.</p>}
                </div>
              </div>
              <button className={`p-1 m-3 ${css.signupButton}`}><p className={`${css.signupButtonText}`}>Sign In</p></button>
            </form>
            <div className={`p-1 m-2 flex justify-center items-center ${css.signinFooter}`}>
              <p>Do not have an account? <Link to='/register'><strong>Sign Up Here!</strong></Link></p>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default Login;