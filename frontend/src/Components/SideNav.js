import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { logOut } from '../services/Controls'
import { BiLogOut, BiSolidDashboard, BiSolidGroup } from 'react-icons/bi'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { AiOutlineMessage, AiOutlineTransaction, AiOutlineSetting } from 'react-icons/ai'
import DashboardHome from './dashboard/DashboardHome'
import Transaction from './dashboard/Transaction'
import { useDispatch } from 'react-redux'

const SideNav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let myRoutes = ["", "groups", "transactions"]
  const out = ()=>{
    logOut(dispatch, navigate)
  }
  return (
    <>
        {/* <div className='dashboardSideNav'> */}
            {/*  */}
            <div className='d-flex flex-column gap-4 dashboardSideBar'>
                <div className='pb-4 px-3 p-3'>
                  <img src={require("../images/blackLogo.png")} className='mx-auto icon-lg' width="120px" alt="" />
                  <img src={require("../images/icon.png")} className='mx-auto d-none icon-sm' width="40px" alt="" />
                </div>
                <div className="d-flex flex-column gap-1">
                  <Link to={""} className='w-100 btnn text-decoration-none px-3 text-start py-3'><BiSolidDashboard className='fs-5 sideIcon' /> &nbsp;&nbsp; <span>Dashboard</span></Link>
                  <Link to={"groups"} className='w-100 btnn text-decoration-none px-3 text-start py-3'><BiSolidGroup className='fs-5 sideIcon' /> &nbsp;&nbsp; <span>Groups</span></Link>
                  <Link to={"transactions"} className='w-100 btnn text-decoration-none px-3 text-start py-3'><AiOutlineTransaction className='fs-5 sideIcon' /> &nbsp;&nbsp; <span>Transaction History</span></Link>
                  <Link className='w-100 btnn text-decoration-none px-3 text-start py-3'><AiOutlineMessage className='fs-5 sideIcon' /> &nbsp;&nbsp; <span>Messages</span></Link>
                  <Link className='w-100 btnn text-decoration-none px-3 text-start py-3'><RiSecurePaymentFill className='fs-5 sideIcon' /> &nbsp;&nbsp; <span>Track Payment</span></Link>
                  <Link className='w-100 btnn text-decoration-none px-3 text-start py-3'><AiOutlineSetting className='fs-5 sideIcon' /> &nbsp;&nbsp; <span>Settings</span></Link>
                  <button onClick={out} className='w-100 btnn text-decoration-none px-3 text-start py-3'><BiLogOut className='fs-5 sideIcon' /> &nbsp;&nbsp; <span>Log Out</span></button>
                </div>
            </div>
            {/* <Routes>
                    <Route path='/' element={<DashboardHome />} />
                    <Route path='/transactions' element={<Transaction />} />
                </Routes> */}
        {/* </div> */}
    </>
  )
}

export default SideNav