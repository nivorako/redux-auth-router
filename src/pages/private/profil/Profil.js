import React, { useEffect } from 'react'

function Profil() {
    useEffect(()=> {
        const inputElement = document.querySelector('input[type="file"]')
        const previewElement = document.querySelector('#preview')
        inputElement.addEventListener("change", () => {
            const file = inputElement.files[0]
            const reader = new FileReader()
    
            reader.addEventListener("load", () => {
                previewElement.src = reader.result
            })
            reader.readAsDataURL(file)
        }, [])
    })
   
  return (
    <div>
      <h1>Ici profil</h1>
      <input type="file" accept="image/*" />
      <img id="preview" style={{width:200}}/>
    </div>
  )
}

export default Profil
