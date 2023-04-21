import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import { Home } from "./pages/Home"
import {SignUpModal} from './components/signUpModal'
import {SignInModal} from "./components/signInModal"
import { Private } from "./pages/private/private/Private"
import Modal from "./components/modal"
import CartContainer from "./components/cartContainer"

import { useDispatch, useSelector } from "react-redux"
import { totalPrice, getCartItems } from "./features/cart/cartSlice"
import { getWeather } from "./features/weather/weatherSlice"

import { useEffect } from "react"


function App() {
  const { base } = useSelector((store) => store.weather)
  const { isOpen } = useSelector((store) => store.modal)
  const {cartItems, isLoading} = useSelector((store) => store.cart)
  const dispatch = useDispatch()
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
        <Route path="/private" element={<Private/> }>
          <Route path="/private/PrivateHome" />
        </Route>
        {/* <CartContainer />
        {isOpen && <Modal />} */}
      </Routes>
  </>
  )
}
export default App;
