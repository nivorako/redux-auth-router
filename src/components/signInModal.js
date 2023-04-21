import React, { useState } from "react"
import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleSignInModal } from "../features/signInModal/signInModalSlice"
import {signInWithEmailAndPassword,} from "firebase/auth"
import { auth } from "../firebase-config"

export  const SignInModal = () => {

    const { signInIsOpen } = useSelector((store) => store.signInModal)
    const [validation, setValidation] = useState("")
    const formRef = useRef()
    const inputs = useRef([])
    const addInputs = el => {
        if(el && !inputs.current.includes(el)) {
            inputs.current.push(el)
            // console.log("el :", el)
            // console.log("inputs.current :", inputs.current)
        }  
    }
    // sensé fermer la modal si on clck en dehors : // TODO
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const  handleClickOutsideModal = (e) => {
        if(e.target === modalRef.current){
           dispatch(toggleSignInModal())
        }
    }
    // identification connexion 
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd) 
    //console.log("inputs.current[0].value :", inputs.current[0].value)
    const handleSignIn = (e) => {
        e.preventDefault()
        
            // inscription selon email (inputs.current[0].value) et pwd (...)
            signIn( 
                inputs.current[0].value,
                inputs.current[1].value
                )
            .then(() => {
                // vider formulaire et setValidation ...
                // formRef.current.reset()
                setValidation("")
                alert("Opération réussie")
            })
            .catch((error) => {
                console.error("erreur :", error)
                setValidation("woopsy, email and / or pwd incorrect") 
            })
    }

    if(signInIsOpen){
    return(
        <div className="modalContainer" onclick={handleClickOutsideModal}>
            <div className="signUpModal" ref={modalRef}>
                <h3>Sign In</h3>
                <form onSubmit={handleSignIn} ref={formRef}>
                    <div>
                        <label 
                            htmlFor='signUpEmail' 
                            className='form-label'
                        >
                            Email adress
                        </label>
                        <input 
                            ref={addInputs}
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
                            ref={addInputs}
                            required
                            name='pwd'
                            type='password'
                            className='form-controll'
                            id='signUpPwd'
                        />
                    </div>

                    <button type="submit" className="signUpModal-btn btn">Submit</button>
                    <p>{validation} </p>
                </form>
            </div>
        </div>
    )}
}