import React from "react"
import { useSelector } from "react-redux"

export  const SignUpModal = () => {

    const {isOpen } = useSelector((store) => store.signUpModal)
    
    return(
        <div className="signUpModal">
            <h3>Sign Up</h3>
            <form>
                <div>
                    <label 
                        htmlFor='signUpEmail' 
                        className='form-label'
                    >
                        Email adress
                    </label>
                    <input 
                        required
                        name='email'
                        type='email'
                        className='form-controll'
                        id='signUpEmail'
                    />
                </div>
                <div>
                    <label htmlFor='signUpPwd' 
                        className='form-label'>
                        Password
                    </label>
                    <input 
                        required
                        name='pwd'
                        type='password'
                        className='form-controll'
                        id='signUpPwd'
                    />
                </div>

                <div>
                    <label htmlFor='repeatPwd' 
                        className='form-label'>
                        Repeat Your Password
                    </label>
                    <input 
                        required
                        name='repeatPwd'
                        type='password'
                        className='form-controll'
                        id='repeatPwd'
                    />
                </div>
                <button type="submit" className="signUpModal-btn btn">Submit</button>
            </form>
        </div>
    )
}