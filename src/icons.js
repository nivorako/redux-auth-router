import { useState } from "react"
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";


export const CartIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 '
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
      />
    </svg>
  );
};

export const ChevronDown = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
    </svg>
  );
};

export const ChevronUp = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
    </svg>
  );
};


export const Heart = () => {
  const [fill, setFill] = useState('none')
  const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return unsubscribe
    }, []);

  const handleClick = async (item) => {
      if(fill === "red"){
          setFill("none")
      }else{
          setFill("red")
      }
      
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        list: arrayUnion(item)
    });
  }
  return (
      <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill={fill}
          viewBox="0 0 24 24" 
          strokeWidth={0.5} 
          stroke="currentColor" 
          className="heart"
          onClick={() => handleClick()}
      >
          <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
          />
      </svg>
  )
}

export const UserIcon = ({width, height}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"  
      fill="none" viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="blue" 
      width={width}
      height={height}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>

  )
}


export const DownloadIcon = ({width, height}) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="1.5" 
      stroke="currentColor" 
      width={width}
      height={height}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
    </svg>

  )
}