import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getGroups } from '../../services/Controls'
import { useDispatch, useSelector } from 'react-redux'

const Groups = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetchingUser, currentUser, fetchingUserFailed } = useSelector((state)=>state.fetchingSlice)
    const { fetchingThrift, ownedThrifts, memberThrifts, fetchingThriftFailed }= useSelector((state)=>state.thriftSlice)
    const [current, setcurrent] = useState("all")
    // const [username, setusername] = useState("")
    // const [currentUser, setcurrentUser] = useState(null)

    // useEffect(() => {
        // setcurrentUser()
        // if (!currentUser) {
        //     currentUser = JSON.parse(localStorage.getItem("user"))
        //     setusername(currentUser.username)
        // }else{
        //     setusername(currentUser.username)
        // }
        // console.log(currentUser);
        // try {
        // } catch (error) {
        //     console.log(error);
        // }
    // }, [])
    // if (currentUser) {
    //     let username = currentUser.username
    //     getGroups(dispatch, username)
        // console.log(ownedThrifts);
    // }
    // console.log(ownedThrifts, memberThrifts);
    
    useEffect(() => {
      if (ownedThrifts) {
        console.log(ownedThrifts);
      }
      if (memberThrifts) {
        console.log(memberThrifts);
      }
    }, [ownedThrifts, memberThrifts])
    

    const getGroups = ()=>{
        // let userId = currentUser._id
        // getGroups(dispatch, userId)
        window.location.reload()
    }

  return (
    <>
        <div className='px-3 groups'>

            <div className='d-flex align-items-center gap-1 group-links'>
                <Link to={''} onClick={(el)=>setcurrent("all")} className={current === "all"? 'h6 h-100 py-2 text-black text-center align-items-center text-decoration-none w-50 click': 'h6 h-100 py-2 text-black text-center align-items-center text-decoration-none w-50'}>All Groups</Link>
                <Link to={'owned'} onClick={(el)=>setcurrent("mine")} className={current === "mine"? 'h6 h-100 py-2 text-black text-center align-items-center text-decoration-none w-50 click': 'h6 h-100 py-2 text-black text-center align-items-center text-decoration-none w-50'}>My Groups</Link>
                <button onClick={getGroups} className='fs-4 btn rounded-circle'>↺</button>
                <Link to={"/dashboard/createthrift"} className='fs-4 btn rounded-circle'>+</Link>
            </div>
            <div>
                {/* <Link className='w-100 btn shadow rounded-pill d-flex gap-4 align-items-end py-1 px-3'>
                    <img className='rounded-circle' src={require("../../images/logo.png")} width="40px" alt="" />
                    <p className='fw-bold fs-6 my-auto text-start'>Co-operative Society</p>
                    <p className='m-auto'>2424333</p>
                    <p className='m-auto'>Defaulted</p>
                    <p>₦10,000</p> 
                    <p>13 July 2022</p>
                </Link> */}
                <Outlet style={{"overflow-y":"auto"}} />
            </div>
        </div>
    </>
  )
}

export default Groups