    import { Routes, Route } from "react-router-dom"
    import { useEffect, useState } from "react"

    import Header from "./components/Header"
    import { Home } from "./pages/Home"
    import {SignUpModal} from './components/signUpModal'
    import {SignInModal} from "./components/signInModal"
    import  Private  from "./pages/private/Private"
    import Create from "./pages/private/create/Create"
    import { Update } from "./pages/private/update/Update"
    // import Modal from "./components/modal"
    // import CartContainer from "./components/cartContainer"
    import { About } from "./pages/About"
    import { useDispatch, useSelector } from "react-redux"
    import { totalPrice, getCartItems } from "./features/cart/cartSlice"
    import { getWeather } from "./features/weather/weatherSlice"
    import { setCurrentUser, setLoading } from "./features/auth/authSlice"

    import { auth } from "./firebase-config"


    // import {collection, doc, setDoc} from "firebase/firestore"
    // import { db } from "./firebase-config"


    function App() {
    const { base } = useSelector((store) => store.weather)
    const { isOpen } = useSelector((store) => store.modal)
    const {cartItems, isLoading} = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        const unsubscribe = auth.onAuthStateChanged( async(user) => {
            console.log("onAuthStateChanged:", user)
            if(user){
                dispatch(setCurrentUser({email: user.email})) 
                console.log("uid :", user.uid) 

            }else {
                dispatch(setCurrentUser(false));
        }
        dispatch(setLoading(false))
        })
        return () => unsubscribe()
    }, [dispatch])

    //console.log("base :", base)
    useEffect(() => {
        dispatch(totalPrice())
    }, [cartItems])

    useEffect(() => {
        dispatch(getCartItems())
    }, [])

    useEffect(() => {
        dispatch(getWeather())
    }, [base])
    

    if(isLoading){
        return (
        <div className="loading">
            <h1>Loading ......</h1>
        </div>
        )
    }
    return (
    <>
        
        <SignUpModal />
        <SignInModal />
        <>
            <Header />
        </>
        
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/private" element={<Private />}>
                <Route index element={<Create />} />
                <Route path="Create" element={<Create />} />
                {/* <Route path="" /> */}
                <Route path="Update/:id" element={<Update />} />
            </Route>
        </Routes>
    </>
    )
    }
    export default App;

    
    //  <CartContainer />
    //       {isOpen && <Modal />}