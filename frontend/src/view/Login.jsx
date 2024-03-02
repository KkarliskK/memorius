import css from '../style/Login.module.css';
import { Link } from 'react-router-dom';
import wave1 from '../assets/wave1.png';
import wave2 from '../assets/wave2.png';

function Login() {

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
            <form className={`flex flex-col justify-center items-center ${css.signinForm}`}>
              <div className={`flex justify-center flex-col ${css.signinSplit}`}>
                <div className={`flex flex-col m-3 ${css.inputBox}`}>
                  <label for='username'>Enter username:</label>
                  <input 
                    type='text'
                    id='username'
                    className={`p-1 ${css.inputField}`}
                    placeholder='e. g. johndoe123'
                  />
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label for='password'>Enter password:</label>
                  <input 
                    type='password'
                    id='password'
                    className={`p-1 ${css.inputField}`}
                    placeholder='Must have at least 6 characters'
                  />
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