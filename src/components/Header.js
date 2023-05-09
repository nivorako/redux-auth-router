import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserNavBar from './UserNavBar'

function Header() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY
        // set state based on location info
        setVisible(prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 10)
        // set state to new position scroll
        setPrevScrollPos(currentScrollPos)
    }

    const debounce = (func, wait) => {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    }
    
    const debounceHandleScroll = debounce(handleScroll, 100)

    useEffect(() => {
       window.addEventListener('scroll', debounceHandleScroll)
       return (() => {
            window.removeEventListener('scroll', debounceHandleScroll)
       })
    }, [prevScrollPos, visible, debounceHandleScroll])

  return (
    <div className='navBar' style={{top: visible ? "0" : "-150px"}}>
      <Navbar />
      <UserNavBar />
    </div> 
  )
}

export default Header
