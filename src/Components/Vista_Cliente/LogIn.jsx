import React from 'react'
import '../../Styles/Login.css'
function Login(){
    return(
    <div className='login'>
        <div className='imagen'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdWifwotFW81eIrkC6DoZ--4wJPSLMQdxxhw&usqp=CAU' alt='imagen'/>
        </div>
        <form className='form-login'>
            <h2>Login</h2>
            <div className='gmail'>
                <ion-icon name="mail-outline"></ion-icon>
                <input type='gmail' className='input-gmail' required/>
                <label htmlFor="">Gmail</label>
            </div>

            <div className="password">
                
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type='password' className='input-password' required/>
                <label htmlFor="">password</label>
            </div>
            <div className="forget">
                <label><input type='checkbox'/>Remeber</label>
                <a href='#' >Forget Password</a>
            </div>
            <button>Log in</button>
            <div className="register">
                <p>no tienes una cuenta <a href='#'> Registrar</a></p>
            </div>
            
            

        </form>
    </div>

    )
}

export default Login