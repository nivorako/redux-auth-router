import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserNavBar from './UserNavBar'

function Header() {

    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [timer, setTimer] = useState(null);
    const delay = 1000; // set the delay in milliseconds


    const controlNavBar = () => {
        clearTimeout(timer)
        setTimer(setTimeout(() => {
            if(window.scrollY > 50) {
                setShow(false)
            }else {
                setShow(true)
            }
        }, delay))
        
        setLastScrollY(window.scrollY)
        
    }

    useEffect(() => {
        if(typeof window !== "undefined"){
            window.addEventListener("scroll", controlNavBar)
        }
        //cleanUp function:
        return () => {
            window.removeEventListener("scroll", controlNavBar)
        }
    }, [])

  return (
    <div className={`navBar ${!show && "hidden"}`}>
      <Navbar />
      <UserNavBar />
    </div> 
  )
}

export default Header
