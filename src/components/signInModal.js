import React, { useEffect, useState, useRef } from "react"

import { useSelector, useDispatch } from "react-redux"

import { toggleSignInModal } from "../features/signInModal/signInModalSlice"

import {signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase-config"

export  const SignInModal = () => {

    const { signInIsOpen } = useSelector((store) => store.signInModal)
    const [validation, setValidation] = useState("")
    const formRef = useRef()

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    //fermer la modal si on clck en dehors 
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    
    const  handleClickOutsideModal = (e) => {
        if(e.target === modalRef.current){
           dispatch(toggleSignInModal())
        }
    }
    // fonction authentification 
    // const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd) 
    const signIn = (email, pwd) => {
        console.log(`signIn called with email: ${email} and password: ${pwd}`);
        return signInWithEmailAndPassword(auth, email, pwd)
    }
    // opération authentification
    const handleSignIn = (e) => {
        e.preventDefault()
        
            // inscription selon email (inputs.current[0].value) et pwd (...)
            signIn( 
                emailInputRef.current.value,
                passwordInputRef.current.value
                )
            .then(() => {
                setValidation("")
                dispatch(toggleSignInModal())
            })
            .catch((error) => {
                console.error("erreur :", error)
                setValidation("woopsy, email and / or pwd incorrect") 
                formRef.current.reset()
            })
    }
    // si la modal signIn est ouvert :
    if(signInIsOpen){
    return(
        <div className="modalContainer" onClick={handleClickOutsideModal} ref={modalRef}>
            <div className="signInModal" >
                <h3>Sign In</h3>
                <form onSubmit={handleSignIn} ref={formRef}>
                    <div className="signInModal-form">
                        <label 
                            htmlFor='signInEmail' 
                            className='form-label'
                        >
                            Email adress
                        </label>
                        <input 
                            ref={emailInputRef}
                            required
                            name='email'
                            type='email'
                            className='form-controll'
                            id='signInEmail'
                        />
                    </div>
                    <div className="signInModal-form">
                        <label htmlFor='signInPwd' 
                            className='form-label'>
                            Password
                        </label>
                        <input 
                            ref={passwordInputRef}
                            required
                            name='pwd'
                            type='password'
                            className='form-controll'
                            id='signInPwd'
                        />
                    </div>

                    <button type="submit" className="signInModal-btn btn">Submit</button>
                    <p>{validation} </p>
                </form>
            </div>
        </div>
    )}
}