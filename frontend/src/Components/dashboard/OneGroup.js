import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import '../../App.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const OneGroup = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isFetchingUser, currentUser, fetchingUserFailed } = useSelector((state)=>state.fetchingSlice)
    const { fetchingThrift, ownedThrifts, memberThrifts, fetchingThriftFailed }= useSelector((state)=>state.thriftSlice)
    const [thrift, setthrift] = useState(null)
    const route = useParams()
    // const location = useLocation()
    // console.log(location);
    // console.log(route);
    useEffect(() => {
     if (ownedThrifts) {
        let owned = ownedThrifts.find(el=>el._id === route.id)
          if (owned) {
            setthrift(owned)
          }
     }
    }, [ownedThrifts])
    useEffect(() => {
        if (memberThrifts) {
            let shared = memberThrifts.find(el=>el._id === route.id)
            if(shared){
            setthrift(shared)
            }
        }
      }, [memberThrifts])

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid rebeccapurple',
  boxShadow: 24,
  p: 4,
};
    const locationArr = window.location.href.split('/')
    const invite = locationArr[locationArr.length-1]
    locationArr.splice(locationArr.length-3, 3);
    const inviteUser = locationArr.join('/')+ "/" + invite;
    useEffect(() => {
      console.log(inviteUser);
    }, [])
    
  return (
    <>
        {
            thrift &&
            <div className='oneGroup'>
                <div className={"d-flex align-items-center gap-3 shadow groupName"}>
                    <img src={require("../../images/bg-logo.png")} className='rounded-circle' width={"50px"} height={"50px"} alt={`${thrift.thriftName} icon`} />
                    <h5>{thrift.thriftName}</h5>
                </div>
                {
                    thrift.headCount === thrift.members.length?
                    <div>
                        <h4>COntribution table</h4>
                        <table>
                            <thead>
                                <tr>
                                    <td>Sun</td>
                                    <td>Mon</td>
                                    <td>Tue</td>
                                    <td>Wed</td>
                                    <td>Thur</td>
                                    <td>Fri</td>
                                    <td>Sat</td>
                                </tr>
                            </thead>
                            
                        </table>
                    </div>:
                    <div>
                        {/* <h6>Contributors</h6> */}
                        {/* {
                            thrift.members.map((el,i)=>(
                                <p><span>{`(${i+1})`}</span> {el}</p>
                            ))
                        } */}
                        
                        <div className='text-center'><img src={require("../../images/Problem solving-bro.png")} width={'500px'} height={'300px'} alt="" /></div>
                        <h6 className="display-6">Oops, not enough members yet</h6>
                        {/* <span></span> */}
                        <Button className='purple' onClick={handleOpen}>Get the invite link</Button>
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                Copy the link below
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <code>{inviteUser}</code>
                                </Typography>
                            </Box>
                        </Modal>

                    </div>
                }
            </div>
        }
    </>
  )
}

export default OneGroup