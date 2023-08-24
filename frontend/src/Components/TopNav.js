import React, { useEffect } from 'react'
import { FaAudible, FaBell, FaBookOpen, FaSearch, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const TopNav = () => {
    const {currentUser} = useSelector((state)=>state.fetchingSlice)
    // useEffect(() => {
    //   console.log(currentUser);
    // }, [])
    
  return (
    <>
        <div className='d-flex align-items-center justify-content-between w-100 px-5 dashboardTopnav'>
            <div className='w-50 d-flex align-items-center rounded-pill search'>
                <button className='btn input w-100 text-start'><FaSearch /> Browse . . .</button>
                {/* <input className='' type="text" placeholder='Sea  rch ...' /> */}
            </div>
            {/* <div className='pb-5 p-3'> */}
                {/* <img src={require("../images/blackLogo.png")} width="120px" alt="" /> */}
            {/* </div> */}
            <div className='topIcons d-flex gap-4 py-3'>
                {/* <button className='btn'><FaAudible /></button>
                <button className='btn'><FaBookOpen /></button> */}
                <Link to={"notifications"} className='btn rounded-circle p-1 fs-5'><FaBell /></Link>
                {/* <div className='dropdown'> */}
                    <button className='btn d-flex align-items-center gap-2 rounded-pill shadow' type="button" data-bs-toggle="dropdown" aria-expanded="false"><FaUser className='rounded-circle fs-5' />{currentUser && currentUser.username}</button>
                    {/* <ul className="dropdown-menu">
                        <li className=''><button className='dropdown-item btn'>View profile</button></li>
                        <li className=''><button className='dropdown-item btn'>LOGOUT</button></li>
                    </ul>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default TopNav