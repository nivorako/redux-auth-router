import React, { useState } from "react"
import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleSignUpModal } from "../features/signUpModal/SignUpModalSlice"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase-config"

export  const SignUpModal = () => {

    const { signUpIsOpen } = useSelector((store) => store.signUpModal)
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
            dispatch(toggleSignUpModal())
        }
    }

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd) 
    //console.log("inputs.current[0].value :", inputs.current[0].value)
    const handleSignUp = (e) => {
        e.preventDefault()
        //gestion des erreurs coté front
        if(inputs.current[1].value.length < 5 || inputs.current[2].value.length < 5){
            setValidation("six characters min")
            return
        }
        if(inputs.current[1].value !== inputs.current[2].value ){
            setValidation("Password does not match")
            return
        }
            // inscription selon email (inputs.current[0].value) et pwd (...)
            signUp( 
                inputs.current[0].value,
                inputs.current[1].value
                )
            .then(() => {
                // vider formulaire et setValidation ...
                formRef.current.reset()
                setValidation("")
                alert("Opération réussie")
            })
            .catch((error) => {
                console.error("erreur :", error)
                if(error.code === "auth/invalid-email"){
                    setValidation("invalid email")
                }
                else if(error.code === "auth/email-already-in-use"){
                    setValidation("email already used")
                }
            })
    }

   
    if(signUpIsOpen){
    return(
        <div className="modalContainer" onClick={handleClickOutsideModal}>
            <div className="signUpModal" ref={modalRef}>
                <h3>Sign Up</h3>
                <form onSubmit={handleSignUp} ref={formRef}>
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

                    <div>
                        <label htmlFor='repeatPwd' 
                            className='form-label'>
                            Repeat Your Password
                        </label>
                        <input                
                            ref={addInputs}
                            required
                            name='repeatPwd'
                            type='password'
                            className='form-controll'
                            id='repeatPwd'
                        />
                    </div>
                    <button type="submit" className="signUpModal-btn btn">Submit</button>
                    <p>{validation} </p>
                </form>
            </div>
        </div>
    )}
}