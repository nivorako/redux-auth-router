import { Routes, Route, Redirect } from "react-router-dom"

import Navbar from "./components/Navbar"
import { Home } from "./pages/Home"
import {SignUpModal} from './components/signUpModal'
import {SignInModal} from "./components/signInModal"
import  Private  from "./pages/private/Private"
import  PrivateHome  from "./pages/private/privateHome/PrivateHome"
// import Modal from "./components/modal"
// import CartContainer from "./components/cartContainer"
import { About } from "./pages/About"
import { useDispatch, useSelector } from "react-redux"
import { totalPrice, getCartItems } from "./features/cart/cartSlice"
import { getWeather } from "./features/weather/weatherSlice"
import { setCurrentUser, setLoading } from "./features/auth/authSlice"
import { auth } from "./firebase-config"

import { useEffect } from "react"

function App() {
  const {currentUser, loading} = useSelector((store) => store.auth)
  const { base } = useSelector((store) => store.weather)
  const { isOpen } = useSelector((store) => store.modal)
  const {cartItems, isLoading} = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(setCurrentUser({email: user.email}))
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
      <Navbar />
      <SignUpModal />
      <SignInModal />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/private" element={<Private />}>
            <Route index element={<PrivateHome />} />
            <Route path="PrivateHome" element={<PrivateHome />} />
        </Route>
      </Routes>
  </>
  )
}
export default App;

 
 //  <CartContainer />
  //       {isOpen && <Modal />}