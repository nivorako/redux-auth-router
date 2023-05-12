import React, { useEffect, useState } from 'react'
import{ useForm} from "react-hook-form"

import { DownloadIcon } from '../../../icons'
import { getAuth, updateProfile } from 'firebase/auth'
import { storage } from "../../../firebase-config" 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"


function Profil() {
  
  const auth = getAuth()
  const user = auth.currentUser
  const [photoUrl, setPhotoUrl] = useState(user.photoURL)
  console.log('nom  :', user.displayName)
  console.log('photo :', user.photoURL)
  const  { register, handleSubmit } = useForm ()
 
  const onSubmit = async (data) => {
    const preview = document.querySelector('#preview')
    const file = data.photo[0]
    // const storageRef = ref(storage);
    const fileRef = ref(storage, `photo/${file.name}`)
    await uploadBytes(fileRef, file)
    const fileUrl = await getDownloadURL(fileRef)
    setPhotoUrl(fileUrl)

    if(user !== null){
      updateProfile(user, {
        displayName: data.nom,
        photoURL: fileUrl,
      }).then(() => {
        // Profile updated!
        preview.innerHTML = ""
      }).catch((error) => {
        // An error occurred
        console.error('error occurs :', error)
      })
    }
  }

  useEffect(()=> {
      const inputElement = document.querySelector('#file-input')
      const preview = document.querySelector('#preview')
      inputElement.addEventListener("change", (e) => {
          const file = inputElement.files[0]
          const reader = new FileReader()
  
          reader.onload = (e) => {
            const img = document.createElement('img')
            img.src = e.target.result
            img.style.maxWidth = "90%"
            img.style.height = "auto"
            preview.innerHTML = ''
            preview.appendChild(img)
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
          <div className='profile-downloadImg'>
            <input type="file" accept="image/*" id="file-input" className='profile-input' {...register("photo")} />
            <label htmlFor="file-input" className='profil-inputLabel' id="preview">
              <DownloadIcon width={20} height={20}/>
            </label>
            {user.photoURL ?  <img src={user?.photoURL} alt='' className='profile-img' /> : null}
           
          </div>
          <p className='profil-paragraph'>Nom</p>
          <input type='text' id='lastName' placeholder={user?.displayName} {...register("nom")}/>
          <label htmlFor='lastName' id='lastName-label'/> 

          <p className='profil-paragraph'>Prénom</p>
          <input type='text' id='firstName' placeholder='Votre prénom' {...register("prenom")}/>
          <label htmlFor='firstName' id='firstName-label'/>

          <p className='profil-paragraph'>Email</p>
          <input type='text' id='email' placeholder={user?.email} {...register("email")}/>
          <label htmlFor='email' id='firstName-email'/>

          <button type='submit' className='profil-btn'>Enregistrer les changements</button>
        </form>
      </div>
    </div>
  )
}

export default Profil
