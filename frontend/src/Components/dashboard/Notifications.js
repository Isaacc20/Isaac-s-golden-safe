import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../App.css'

const Notifications = ({socket}) => {
    useEffect(() => {
      console.log(socket);
      if (socket.current) {
        socket.current.on("notify", (message)=>{
            console.log(message);
          })
      }
    }, [socket.current])
    

  return (
    <>
        <div className='px-4'>
            <h4 className='p-2'>Notifications</h4>
            <table className='table table-striped'>
                {/* <thead>
                    <tr>
                        <td></td>
                        <td className='h6'>Name</td>
                        <td className='h6'>Id</td>
                        <td className='h6'>Status</td>
                        <td className='h6'>Amount</td>
                        <td className='h6'>Date</td>
                    </tr>
                </thead> */}
                <tbody>
                    <tr className='d-grid'>
                        <td><img className='rounded-circle' src={require("../../images/logo.png")} width="40px" alt="" /> <strong>Isaac Oyedele</strong> requested to join <strong>SQI ajo</strong> that you created</td>
                        <td className='text-end'><button>Accept</button>  <button>Reject</button></td>
                    </tr>
                    <tr className='d-grid'>
                        <td><img className='rounded-circle' src={require("../../images/logo.png")} width="40px" alt="" /> <strong>Isaac Oyedele</strong> requested to join <strong>SQI ajo</strong> that you created</td>
                        <td className='text-end'><button>Accept</button>  <button>Reject</button></td>
                    </tr>
                    <tr className='d-grid'>
                        <td><img className='rounded-circle' src={require("../../images/logo.png")} width="40px" alt="" /> <strong>Isaac Oyedele</strong> requested to join <strong>SQI ajo</strong> that you created</td>
                        <td className='text-end'><button>Accept</button>  <button>Reject</button></td>
                    </tr>
                    <tr className='d-grid'>
                        <td><img className='rounded-circle' src={require("../../images/logo.png")} width="40px" alt="" /> <strong>Isaac Oyedele</strong> requested to join <strong>SQI ajo</strong> that you created</td>
                        <td className='text-end'><button>Accept</button>  <button>Reject</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Notifications