import { useState, useEffect } from "react"
import { auth } from "../../../firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import { setDoc, collection, doc, updateDoc, getDoc, addDoc } from "firebase/firestore"
import { db } from "../../../firebase-config"

const Create = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return unsubscribe
    }, [])
    //console.log("user :", user)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const userData = Object.fromEntries(formData.entries())
        console.log('userdata before :', userData)
        userData.userId = user.uid
        console.log('userdata after :', userData)
        addDoc(collection(db, 'users'), userData)
            .then(() => {
                console.log("opération réussie")
            }).catch((error) =>{
                console.error("an error has occur :", error)
            })
    }
    return(
        <div className="create">
            <form onSubmit={handleSubmit} className="createForm">
                <label>
                    Prénom:
                    <input type="text" name="firstName" />
                </label>
                <label>
                    Nom:
                    <input type="text" name="lastName" />
                </label>
                <label>
                    Localisation:
                    <input type="text" name="location" />
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    )
}

export default Create