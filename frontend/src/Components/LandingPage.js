import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FaAngleRight, FaChevronRight,FaChevronLeft } from 'react-icons/fa'

const LandingPage = () => {
  const [myClass, setmyClass] = useState("navv")
  const toggleSideBar = (e)=>{
    let sidebar = e.target.parentElement
    
    if (sidebar.className == "sidebar") {
      sidebar.className = "sidebarout"
    }else {
      sidebar.className = "sidebar"
    }
    console.log(sidebar.className);
    
  }
  return (
    <>
        <div className='landing'>
          <div className="dark">
            <div className="sidebar">
              <button onClick={toggleSideBar} className='my-4 text-light menu'>›</button>
              <div className="gap-3 sidenav container p-3">
                <Link className='logo'><img src={require("../images/blackLogo.png")} width={"140px"} alt="" /></Link>
                <Link to={"/login"} className='btn rounded-pill border-white text-white bg-dark'>Log In</Link>
                <Link to={"/createaccount"} className='btn rounded-pill btn-light'>Create an Account</Link>
              </div>
            </div>
            <div className="topnav d-flex align-items-center container justify-content-between">
              <Link className='logo'><img src={require("../images/whiteLogo.png")} width={"140px"} alt="" /></Link>
              <div className="d-flex gap-3 navvv">
                <Link to={"/login"} className='btn rounded-pill border-white text-white bg-dark'>Log In</Link>
                <Link to={"/createaccount"} className='btn rounded-pill btn-light'>Create an Account</Link>
              </div>
            </div>
            <div className="container unlock d-flex flex-column gap-3 justify-content-center">
              <h1 className='text-white display-4'>Unlock the Power <br /> of Thrift and Achieve <br /> Your Financial Goals.</h1>
              <Link className='btn rounded-pill border-white text-white bg-dark px-5 py-2' style={{width:'fit-content'}} to={"/createaccount"}>Get Started <AiOutlineArrowRight /></Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default LandingPage