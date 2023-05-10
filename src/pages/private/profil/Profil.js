import React, { useEffect } from 'react'
import{ useForm} from "react-hook-form"

import { DownloadIcon } from '../../../icons'
import { getAuth, updateProfile } from 'firebase/auth'

function Profil() {
  const auth = getAuth()
  const user = auth.currentUser
  const  { register, handleSubmit } = useForm ()

  if(user !== null){
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }

  const onSubmit = async (data) => {
    console.log('data ', data)
  }

  useEffect(()=> {
      const inputElement = document.querySelector('#file-input')
      const preview = document.querySelector('#preview')
      inputElement.addEventListener("change", (e) => {
          const file = inputElement.files[0]
          const reader = new FileReader()
  
          reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.innerHTML = '';
            preview.appendChild(img);
          }
          reader.readAsDataURL(file)
      }, [])
  })
   
  return (
    <div className='profil'>
      <div className='profil-detail'>
        <h4>Detail du profil</h4>
        <p className='profil-paragraph'>Changer la photo du profil</p>
        <form className='profil-form'  onSubmit={handleSubmit(onSubmit)}>
          <input type="file" accept="image/*" id="file-input" className='profile-input' {...register("photo")} />
          <label htmlFor="file-input" className='profil-inputLabel' id="preview">
            <DownloadIcon width={20} height={20}/>
          </label>

          <p className='profil-paragraph'>Nom</p>
          <input type='text' id='lastName' placeholder='rakoto' {...register("nom")}/>
          <label htmlFor='lastName' id='lastName-label'/> 

          <p className='profil-paragraph'>Prénom</p>
          <input type='text' id='firstName' placeholder='rakoto' {...register("prenom")}/>
          <label htmlFor='firstName' id='firstName-label'/>
          <button type='submit' className='profil-btn'>Enregistrer les changements</button>
        </form>
      </div>
    </div>
  )
}

export default Profil
