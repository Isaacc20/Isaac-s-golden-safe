import React, { useEffect, useState } from 'react'
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getInvitedGroup, getUserDetails, joinGroup } from '../../services/Controls'

const Invite = ({socket}) => {
    const [willJoin, setwillJoin] = useState(false)
    const { isFetchingUser, currentUser, fetchingUserFailed } = useSelector((state)=>state.fetchingSlice)
    const { isFetchingInvite, inviteGroup, fetchInviteError, sendingRequest, requestSent, requestFailed } = useSelector((state)=>state.thriftSlice)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const route = useParams()
    let id = route.id
    let token = JSON.parse(localStorage.getItem("token"))
    let date = new Date()
    
    useEffect(() => {
      getInvitedGroup(dispatch, id)
      console.log(currentUser,date.getMonth());
    }, [])

    useEffect(() => {
        if (fetchingUserFailed) {
            // alert(fetchingUserFailed)
            localStorage.removeItem("token")
            localStorage.setItem("joinGroup", JSON.stringify(id))
            navigate("/login")
        }
    }, [fetchingUserFailed])
    
    // useEffect(() => {
    //   if (currentUser && willJoin) {
    //     joinGroup(dispatch, id, currentUser._id)
    //   }
    // }, [currentUser])
    useEffect(() => {
        if (currentUser && willJoin) {
          joinGroup(dispatch, id, currentUser._id)
        }
      }, [willJoin])

    // useEffect(() => {
    //     if (currentUser) {
    //         let details = {
    //             userId: currentUser._id,
    //             thriftId: id,
    //             date: `${date.getDate()}/${date.getMonth()}/${date.getDay()}`,
    //             time: `${date.getHours()}:${date.getMinutes}:${date.getSeconds}`
    //         }
    //       if (requestSent && socket) {
    //         console.log(socket);
    //         socket.current.emit("sendRequest", details)
    //       }
    //     }
    // }, [requestSent])

    // useEffect(() => {
    //   if (socket.current) {
    //     socket.current.on("requestSent", (details)=>{
    //         console.log(details)
    //     })
    //   }
    // }, [socket])

    useEffect(() => {
        if (currentUser && socket && requestSent) {
          let details = {
            userId: currentUser._id,
            thriftId: id,
            date: `${date.getDate()}/${date.getMonth()}/${date.getDay()}`,
            time: `${date.getHours()}:${date.getMinutes}:${date.getSeconds}`
          };
          socket.current.emit("sendRequest", details);
        }
      }, [currentUser, socket, requestSent]);

    useEffect(() => {
        console.log(socket.current);
        if (socket.current) {
            // Listen for events using the passed socket instance
        socket.current.on('requestSent', (message) => {
            console.log(`Received: ${message}`);
            // Handle the "requestSent" event in your component
          });
      
          socket.current.on('notify', (message) => {
            console.log(`Received: ${message}`);
            // Handle the "notify" event in your component
          });
        }
    
        // Clean up the event listeners on component unmount
        // return () => {
        //   socket.off('requestSent');
        //   socket.off('notify');
        // };
      }, [socket]);
    
    
    
    const sendRequest = ()=>{
        console.log(currentUser, isFetchingUser);
        if (!currentUser) {
            getUserDetails(dispatch, token)
            setwillJoin(true)
        } else {
            joinGroup(dispatch, id, currentUser._id)
        }
    }
    
  return (
    <>
        {
        (isFetchingUser || isFetchingInvite || sendingRequest) &&
        <div className='preloader d-flex flex-column justify-content-center align-items-center'>
            <div className="loader"></div>
            <small>{isFetchingUser? "Getting User details...": isFetchingInvite? "Getting thrift details..." : "Validating group..."}</small>
        </div>
        }
        {
            (fetchInviteError || requestFailed) &&
            <div className='position-absolute top-0 right-0 left-0 w-100'>
                <small className='alert alert-danger w-100 text-center'>{fetchInviteError? fetchInviteError: requestFailed}</small>
            </div>
        }
            <div className='invite'>
                <div className='invite-inner d-grid justify-content-center align-items-center'>
                    { inviteGroup &&
                        <div className='dGroup text-end'>
                            <div className='theGroup text-center'>
                                <img src={require("../../images/1-water-money-plant.png")} width="300px" height={"100%"} alt="" />
                                <div className='theGroupDetails pt-3 px-3'>
                                    <h5 className='text-start text-light'>{inviteGroup.thriftName}</h5>
                                    <p className='text-start text-light'>{inviteGroup.members.length} Members</p>
                                    <p className='text-start text-light'>₦{inviteGroup.amount.toLocaleString()} {inviteGroup.frequency} for {inviteGroup.duration}</p>
                                    <p className='text-start text-light'>₦{inviteGroup.thriftPool.toLocaleString()} thrift pool</p>
                                </div>
                            </div>
                            <button onClick={sendRequest} className='btn bg-black text-white w-100 rounded-0'>Join group</button>
                        </div>
                    }
                </div>
            </div>
    </>
  )
}

export default Invite