import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import CartContainer from "./components/cartContainer"
import { useDispatch, useSelector } from "react-redux"
import { totalPrice, getCartItems } from "./features/cart/cartSlice"
import { useEffect } from "react"
import Modal from "./components/modal"
import { getWeather } from "./features/weather/weatherSlice"

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
    <main>
      <Navbar />
      <CartContainer />
      {isOpen && <Modal />}
  </main>
  )
}
export default App;
