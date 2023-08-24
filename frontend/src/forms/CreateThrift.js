import { useFormik } from 'formik'
import '../App.css'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { createThrift, getUserDetails } from '../services/Controls'
import { ToastContainer, toast } from 'react-toastify'

const CreateThrift = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isFetchingUser, currentUser, fetchingUserFailed } = useSelector((state)=>state.fetchingSlice)
    const { creating, created, createFailed }= useSelector((state)=>state.thriftSlice)
    // const [currentUser, setcurrentUser] = useState(null)
  // const [thriftPool, setthriftPool] = useState(null)
  const [thrift, setthrift] = useState(null)
  
  // const defaultValue = ""
  
  let token = localStorage.token
  useEffect(() => {
    if (createFailed) {
      toast.error(createFailed)
    } else if (created) {
      setthrift(null)
      toast.success("Successful")
      setTimeout(() => {
      // window.location.reload()
      navigate(`/dashboard/groups/${created}`)
    }, 5000);
    }
  }, [created])
  
  const formik = useFormik({
    initialValues:{
      name: "",
      number: "",
      freq: "",
      plan: "",
      amount: "",
      interest: "",
  },
  validationSchema: yup.object({
      name: yup.string().matches(/^[^@]*$/, 'The "@" symbol is not allowed').min(1, "name is too short").required("This field is required"),
      number: yup.number().required("This field is required"),
      freq: yup.string().required("This field is required"),
      plan: yup.number().required("This field is required"),
      amount: yup.number().required("This field is required"),
      // pool: yup.number().required("This field is required"),
      interest: yup.number().required("This field is required"),
      // password: yup.string().min(4).required("This field is required")
  }),
  onSubmit: (values)=>{
    if (fetchingUserFailed) {
      // localStorage.removeItem("token")
      toast.error("Sorry, you have to login", onclose=()=>{
        navigate("/")
      })
      
    } else {
      console.log(values);
      setthrift({
        leader: currentUser._id,
        thriftName : values.name,
        headCount : values.number,
        members: [currentUser._id],
        frequency: values.plan + " " + values.freq,
        duration: values.number * values.plan + " " + values.freq,
        amount: values.amount,
        interest: values.interest,
        thriftPool: values.amount * values.number
      })
      console.log(thrift);
    }
      
  }
  })
  const edit = ()=>{
    setthrift(null)
  }
  const save = ()=>{
    createThrift(dispatch, thrift)
  }
  // console.log(currentUser);
  return (
    <>
            {/* {
                currentUser === null &&
                <div className='preloader d-flex justify-content-center align-items-center'>
                    <div className='ping'></div>
                </div>
            } */}
            {
              creating &&
              <div className='preloader d-flex justify-content-center align-items-center'>
                    <div className='loader'></div>
                </div>
            }
      <div className='d-flex justify-content-center align-items-center w-100 create'>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit} className='thriftForm d-flex flex-column gap-4 align-items-center p-5'>
                <h4>Create a Thrift Group</h4>
                <div className="d-flex w-100 px-4 gap-5 justify-content-around">
                  <div className="w-50 d-flex flex-column px-2 gap-4">
                    <div className='small'>
                        <label htmlFor="name">Enter group name</label>
                        <input onChange={formik.handleChange} type="text" name="name" id="name" className={formik.errors.name?"form-control is-invalid rounded-3":"form-control rounded-3"} />
                    </div>

                    <div className='small'>
                        <label htmlFor="number">Number of contributors</label>
                        <input onChange={formik.handleChange} type="number" name="number" id="number" className={formik.errors.number?"form-control is-invalid rounded-3":"form-control rounded-3"} />
                    </div>

                    <div className="small">
                      <label htmlFor="plan">Contribution frequency</label>
                      <div className={formik.errors.plan? "form-control d-flex align-items-center plan is-invalid": formik.errors.freq? "form-control d-flex align-items-center plan is-invalid": "form-control d-flex align-items-center plan"}>
                        <input onChange={formik.handleChange} className='w-25' type="number" name="plan" id="plan" /><br />
                        <select className='w-75' name="freq" onChange={formik.handleChange} id="freq">
                          <option value=""></option>
                          <option value="day(s)">Day(s)</option>
                          <option value="week(s)">Week(s)</option>
                          <option value="month(s)">Month(s)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="w-50 d-flex flex-column px-2 gap-4">
                    <div className='small'>
                        <label htmlFor="amount">Amount to be paid (₦)</label>
                        <input onChange={formik.handleChange} type="number" name="amount" id="amount" className={formik.errors.amount?"form-control is-invalid rounded-3":"form-control rounded-3"} />
                    </div>
                    
                    <div className='small'>
                        <label htmlFor="interest">Interest if defaullted (₦)</label>
                        <input onChange={formik.handleChange} type="number" name="interest" id="interest" className={formik.errors.interest?"form-control is-invalid rounded-3":"form-control rounded-3"} />
                    </div>
                  </div>
                </div>
                <button type='submit' className='btn text-white rounded-3 px-4 purple-btn button' disabled={false}>{"Create Thrift"}</button>
                {/* <small className=''><Link className='link' to={currentUser?"/dashboard":'/login'} disabled={isFetchingUser}>{currentUser?"Go to Dashboard":"Log In"}</Link></small> */}
            </form>

          {
            currentUser &&
            <div className={thrift? 'confirm-details d-flex gap-4 align-items-center justify-content-center p-5': 'confirm-page d-flex flex-column gap-4 align-items-center p-5'}>
              <div className='confirm'>
                <div className="confirm-inner w-75 d-flex flex-column gap-3">
                  <h3 className='text-center fw-bold italic'>Confirm group details</h3>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Thrift name:</h6>
                    <span>{thrift && thrift.thriftName}</span>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Thrift owner:</h6>
                    <span>{currentUser.username}</span>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Number of contributors:</h6>
                    <span>{thrift && thrift.headCount} people</span>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Contribution frequency:</h6>
                    <span>{thrift && thrift.frequency}</span>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Thrift duration:</h6>
                    <span>{thrift && thrift.duration}</span>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Amount contributed:</h6>
                    <span>{thrift && `₦${thrift.amount}`}</span>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Interest if defaulted:</h6>
                    <span>{thrift && `₦${thrift.interest}`}</span>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h6>Thrift pool amount:</h6>
                    <span>{thrift && `₦${thrift.thriftPool}`}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-around">
                    <button onClick={edit} className='btn purple-btn px-4 h6 text-light'>Edit</button>
                    <button onClick={save} className='btn gold-btn px-4 h6'>Save</button>
                  </div>
                </div>
              </div>
            </div>
          }
            
        </div>
    </>
  )
}

export default CreateThrift