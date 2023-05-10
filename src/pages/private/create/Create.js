import { useState, useEffect } from "react"
import{ useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { auth } from "../../../firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import {  collection, addDoc } from "firebase/firestore"
import { db } from "../../../firebase-config"
import { storage } from "../../../firebase-config" 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const Create = () => {
    const navigate = useNavigate()

    const  { register, handleSubmit } = useForm ()
   
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return unsubscribe
    }, [])

    const onSubmit = async (data) => {
        data.id = user.uid
        console.log("data : ", data)
        
        const file = data.photo[0];
       // const storageRef = ref(storage);
        const fileRef = ref(storage, `cars/${file.name}`);
        await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);

        addDoc(collection(db, "users"), {...data, photo: fileUrl})
            .then(() => {
                console.log("opération réussie")
                navigate("/")
            })
            .catch((err) => {
                console.error("an error has occur :", err)
            })
    }

    return(
        <div className="create">
            <div className="create-form">
                <h4>Déposez votre annonce ici : </h4>
                <form onSubmit={handleSubmit(onSubmit)} className="createForm">

                    <label>
                        Nom:
                        {/* <input type="text" name="firstName" /> */}
                         <input type="text" placeholder="nom" {...register("nom")} />
                    </label>
                    <label>
                        Catégorie:
                        {/* <input type="text" name="lastName" /> */}
                         <input type="text" placeholder="catégorie" {...register("categorie")} />
                    </label>
                    <label>
                        Date de mise en circulation:
                        {/* <input type="text" name="location" /> */}
                         <input type="number" placeholder="date de mise en circulation" {...register("date")} />
                    </label>
                    <label>
                        photo:
                        {/* <input type="text" name="location" /> */}
                         <input type="file" placeholder="photo" {...register("photo")} />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>  
        </div>
    )
}

export default Create