import css from '../style/Register.module.css';

function Register() {

    return (
      <>
      <div className={`flex justify-center items-center ${css.mainContainer}`}>
        <div className={`flex flex-col items-center p-4 ${css.signupContainer}`}>
          <div className={`flex justify-center ${css.signupHead}`}>
            <h2 className={`${css.h2}`}>Sign Up into <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 ${css.h1}`}>Memorius</span></h2>
          </div>
          <div className={`${css.signupBody}`}>
            <form className={`flex flex-col justify-center items-center ${css.signupForm}`}>
              <div className={`flex justify-center ${css.signupSplit}`}>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label for='name'>Enter name:</label>
                  <input  
                    type='text'
                    id='name'
                    className={`p-1 ${css.inputField}`}
                  />
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label for='username'>Enter username:</label>
                  <input 
                    type='text'
                    id='username'
                    className={`p-1 ${css.inputField}`}
                  />
                </div>
              </div>
              <div className={`flex justify-center ${css.signupSplit}`}>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label for='email'>Enter email:</label>
                  <input 
                    type='text'
                    id='email'
                    className={`p-1 ${css.inputField}`}
                  />
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label for='mobile'>Enter phone number:</label>
                  <input 
                    type='number'
                    id='mobile'
                    className={`p-1 ${css.inputField}`}
                  />
                </div>
              </div>
              <div className={`flex justify-center ${css.signupSplit}`}>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label for='password'>Enter password:</label>
                  <input 
                    type='password'
                    id='password'
                    className={`p-1 ${css.inputField}`}
                  />
                </div>
                <div className={`flex flex-col m-2 ${css.inputBox}`}>
                  <label for='repeatPassword'>Repeat password:</label>
                  <input 
                    type='password'
                    id='repeatPassword'
                    className={`p-1 ${css.inputField}`}
                  />
                </div>
              </div>
              <button className={`p-2 m-3 ${css.signupButton}`}><p className={`${css.signupButtonText}`}>Sign Up</p></button>
            </form>
            <div className={`p-1 m-2 flex justify-center items-center ${css.signupFooter}`}>
              <p>Already have an account? <a className={`text-indigo-700 font-semibold`} href='/login'>Sign In Here!</a></p>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default Register;