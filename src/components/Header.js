import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserNavBar from './UserNavBar'

function Header() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY
        // set state based on location info
        setVisible(prevScrollPos > currentScrollPos )
        // set state to new position scroll
        setPrevScrollPos(currentScrollPos)
    }
    

    useEffect(() => {
       window.addEventListener('scroll', handleScroll)
       return (() => {
            window.removeEventListener('scroll', handleScroll)
       })
    }, [prevScrollPos, visible, handleScroll])

  return (
    <div className='navBar' style={{top: visible ? "0" : "-150px"}}>
      <Navbar />
      <UserNavBar />
    </div> 
  )
}

export default Header
