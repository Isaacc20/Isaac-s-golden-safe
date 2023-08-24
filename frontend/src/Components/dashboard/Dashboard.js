import axios from 'axios'
import '../../App.css'
import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import SideNav from '../SideNav'
import TopNav from '../TopNav'
import { useDispatch, useSelector } from 'react-redux'
import { getGroups, getUserDetails } from '../../services/Controls'
import { isFetchingThrift, memThrifts, ownThrifts } from '../../Redux/thriftSlice'
// import DashboardHome from './DashboardHome'
// import Transaction from './Transaction'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetchingUser, currentUser, fetchingUserFailed } = useSelector((state)=>state.fetchingSlice)
    const { fetchingThrift, ownedThrifts, memberThrifts, fetchingThriftFailed }= useSelector((state)=>state.thriftSlice)

    let token = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        getUserDetails(dispatch, token)
    }, [])

    useEffect(() => {
        if (currentUser) {
            let userId = currentUser._id
            getGroups(dispatch, userId)
            console.log(ownedThrifts, memberThrifts);
        }
    }, [currentUser])
    
    useEffect(() => {
        if (fetchingUserFailed) {
            // alert(fetchingUserFailed)
            localStorage.removeItem("token")
            navigate("/login")
        }
    }, [fetchingUserFailed])
    
    
    
  return (
    <>
            {
                (isFetchingUser || memberThrifts === null) &&
                <div className='preloader d-flex flex-column justify-content-center align-items-center'>
                    <div className="loader"></div>
                    <small>{isFetchingUser? "Getting User details": "Getting available thrifts"}</small>
                </div>
            }
        <div className='myDashboard d-flex'>
                <SideNav />
            <div className="">
                <TopNav />
                <Outlet />
            </div>
        </div>
    </>
  )
}

export default Dashboard