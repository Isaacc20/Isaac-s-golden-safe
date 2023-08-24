import React from 'react'
import '../../App.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MyGroups = () => {
    const { fetchingThrift, ownedThrifts, memberThrifts, fetchingThriftFailed }= useSelector((state)=>state.thriftSlice)
    // console.log(ownedThrifts._id);
  return (
    <>
        {
            ownedThrifts && 
            ownedThrifts.length > 0?
                <div className='group-list'>
                    {ownedThrifts.map((el, i)=>(
                        <Link to={el._id} className='w-100 btn group-link rounded-1 d-flex gap-4 align-items-end py-1 px-3 my-2'>
                            <div className='d-flex gap-3 align-items-center'>
                                <img className='rounded-circle' src={require("../../images/bg-logo.png")} width="40px" alt="" />
                                <div className="d-flex flex-column align-items-start">
                                    <span className='fs-6 italic'>{el.thriftName}</span>
                                    <span>₦{el.amount.toLocaleString()} {el.frequency} pack ₦{el.thriftPool.toLocaleString()} <span style={{"color":"rebeccapurple"}}>•</span> {el.headCount} members</span>
                                </div>
                            </div>
                            {/* <p className='m-auto'>Defaulted</p>
                            <p>₦10,000</p> 
                            <p>13 July 2022</p> */}
                        </Link>
                    ))}
                </div>:
            <div className='text-center'>
                <img src={require("../../images/notFound.png")} className='' width={"100%"} height={"450px"} alt="" />
            </div>
        }
    </>
  )
}

export default MyGroups