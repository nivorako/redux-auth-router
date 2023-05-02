import React from "react"
import {useForm} from 'react-hook-form'

export const Update = () => {
  
    const {register, handleSubmit }  = useForm()
    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                console.log("data :", data)
            })}>
                <input {...register("firstname", {required: true})} placeholder="firstName" />
                <input {...register("lastname", {required:true, minLength: 4})} placeholder="lastName" />
                <input type="submit" />
            </form>
        </>
    )
}