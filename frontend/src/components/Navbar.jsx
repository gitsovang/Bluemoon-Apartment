import React, { useEffect, useState } from 'react'
import LogoIcon from '../assets/assets/logo.png'
import {Link} from 'react-router-dom'
import Login from './Login'

const Navbar = () => {
    const [sticky,setSticky] = useState(false)
    useEffect(()=>{
        const handleScroll = () =>
        {
            if(window.scrollY>0)
            {
                setSticky(true)
            }
            else{
                setSticky(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () =>
        {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])
    const navItems =(
        <>
        <li><Link to = "/">Home</Link></li>
        <li><Link to = "/about">About</Link></li>
        </>
    );
  return (
    <>
    <div className={`max-w-screen-2xl containter mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-10 ${
        sticky
        ? "sticky-navbar shawdow-md bg-base-200 duration-300 transition-all ease-in-out"
        : ""
    }`}
    >
      <div>
    <div className="text-xl navbar">
    <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="font-semibold menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-base-100 rounded-box">
        {navItems}
      </ul>
    </div>
    <Link to = "/">  <img className='cursor-pointer' style={{ width: '180px', height: 'auto' }} src={LogoIcon} alt="" /></Link>
    </div>
    <div className='navbar-end flex justify-center items-center space-x-2'>
    <div className="navbar-center hidden lg:flex">
    <ul className="font-semibold text-md menu menu-horizontal px-1">
        {navItems}
    </ul>
    </div>
    <div>
    <a className="font-bold bg-black text-white px-4 py-1 rounded-md hover:bg-slate-800 duration-300 cursor-pointer" onClick={()=>document.getElementById("my_modal_3").showModal()}>Login</a>
    <Login/>
    </div>
    </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
