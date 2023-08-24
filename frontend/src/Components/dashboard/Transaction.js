import React from 'react'
import '../../App.css'

const Transaction = () => {
  return (
    <>
        <div className='px-4'>
            <h4 className='p-2'>All Transactions</h4>
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
                    <tr className=''>
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
    </>
  )
}

export default Transaction