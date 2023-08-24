import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from "yup"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { signUpUser } from '../services/Controls'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching, signedUser, fetchingFailed } = useSelector((state)=>state.fetchingSlice)
    const [show, setshow] = useState(false)

    useEffect(() => {
        if (signedUser !== null) {
            localStorage.setItem("token", JSON.stringify(signedUser.token)) 
            navigate("/dashboard")
        }
    }, [signedUser])
    
    const showPassword = ()=>{
        show? setshow(false): setshow(true)
        console.log(show);
    }
    
    const formik = useFormik({
        initialValues:{
            username: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            username: yup.string().matches(/^[^@]*$/, 'The "@" symbol is not allowed').min(1, "Username is too short").required("This field is required"),
            email: yup.string().email("Must be a valid email").required("This field is required"),
            password: yup.string().min(4).required("This field is required")
        }),
        onSubmit: (values)=>{
            signUpUser(dispatch, values)
            
        }
    })
    // const signUp = (e)=>{
    //     e.preventDefault()
    //     console.log(details);
    //     axios.post(`${uri}/signup`, details)
    //     .then((res)=>{
    //         console.log(res.data);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }
    
  return (
    <>
        <div className='d-flex justify-content-center align-items-center w-100 h-100 form'>
            <form onSubmit={formik.handleSubmit} className='theForm form-control d-flex flex-column gap-4 align-items-center p-4'>
                {/* {signedUser.status? <small className='alert alert-success'>{signedUser.message}</small>: <small className='alert alert-danger'>{signedUser.message}</small>} */}
                {fetchingFailed && <small className='alert alert-danger'>{fetchingFailed}</small>}
                {signedUser && <small className='alert alert-success'>{signedUser.message}</small>}
                <h4 className={isFetching? "title":undefined}> Create Account</h4>
                <div className='w-75 small'>
                    <label htmlFor="username">Username</label>
                    <input onChange={formik.handleChange} type="text" name="username" id="username" className={formik.errors.username?"form-control is-invalid rounded-3":"form-control rounded-3"} />
                    <small className='text-danger'>{formik.errors.username}</small>
                </div>

                    <div className='w-75 small'>
                        <label htmlFor="email">Email</label>
                        <input onChange={formik.handleChange} type="email" name="email" id="email" className={formik.errors.email?"form-control is-invalid rounded-3":"form-control rounded-3"} />
                        <small className='text-danger'>{formik.errors.email}</small>
                    </div>
                
                <div className='w-75 small'>
                    <label htmlFor="password">Password</label>
                    <div className={formik.errors.password?"form-control is-invalid rounded-3 d-flex":"form-control rounded-3 d-flex"}>
                        <input className="w-100 password" onChange={formik.handleChange} type={show?"text":"password"} name="password" id="password" />
                        <button type='button' onClick={showPassword} className={formik.values.password?'btn bg-transparent password':'btn bg-transparent password d-none'}>
                            {show?<FaEyeSlash />: <FaEye />}
                        </button>
                    </div>
                    <small className='text-danger'>{formik.errors.password}</small>
                </div>
                
                <button type='submit' className='btn text-white rounded-3 w-75 button' disabled={isFetching?true:false}>{isFetching?"Loading...":"Sign up"}</button>
                <small className=''>Already have an account? <Link className='link' to={'/login'}>Log In</Link></small>
            </form>
        </div>
    </>
  )
}

export default SignUp