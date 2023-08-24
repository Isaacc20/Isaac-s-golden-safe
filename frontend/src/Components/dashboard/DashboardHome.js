import React from 'react'
import { GiVelociraptorTracks, GiTakeMyMoney, GiBeveledStar } from 'react-icons/gi'
import { Link, useParams } from 'react-router-dom'
import { ImMakeGroup } from 'react-icons/im'

const DashboardHome = () => {
    // const route = useParams()
    // console.log(route);
  return (
    <>
        <div className=' d-grid gap-4 p-3 px-5 dashboardHome'>
            <div className='d-grid gap-4'>
                <div className="d-flex gap-4 w-100 balance">
                    <div className="w-50 py-3 px-4 rounded-4 position-relative box boxx">
                        <div className="wave"></div>
                        <div className='div'>
                            <h5 className='text'>Balance</h5>
                            <h4 className='text money'>$300,000</h4>
                        </div>
                        {/* <div className="rounded-circle"><div className="h-50 w-25 colo"></div></div> */}
                    </div>
                    <Link to={"createthrift"} className=' text-start w-50 py-3 text-decoration-none px-4 rounded-4 fav boxx'>
                        <h1 className='text'><ImMakeGroup /></h1>
                        {/* <hr /> */}
                        <h5 className='text'>Create a Thrift</h5>
                    </Link>
                </div>
                <div className="d-flex gap-4 w-100 balance">
                    <button className="text-start w-50 py-3 px-4 rounded-4 fund boxx">
                        <h3 className='text'><GiVelociraptorTracks className='display-6' /> </h3>
                        <h5 className='text'>Fund Wallet</h5>
                    </button>
                    <button className=' text-start w-50 py-3 px-4 rounded-4 pay boxx'>
                        <h1 className='text'><GiTakeMyMoney className='display-6' /></h1>
                        <h5 className='text'>Make Payment</h5>
                    </button>
                </div>
            </div>
            <div className='mt-4'>
                <h4 className='p-2'>Recent Transactions</h4>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td></td>
                            <td className='h6'>Name</td>
                            <td className='h6'>Id</td>
                            <td className='h6'>Status</td>
                            <td className='h6'>Amount</td>
                            <td className='h6'>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img className='rounded-circle' src={require("../../images/logo.png")} width="40px" alt="" /></td>
                            <td>Isaac Oyedele</td>
                            <td>2424333</td>
                            <td>Money-In</td>
                            <td>₦10,000</td>
                            <td>13 July 2022</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default DashboardHome