import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginUser, sendCode } from '../services/Controls'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

const LogIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLogging, loggedUser, loginFailed } = useSelector((state)=>state.fetchingSlice)
    const { isFetchingCode, code, fetchingCodeFailed } = useSelector((state)=>state.forgotPasswordSlice)
    const [gmail, setgmail] = useState("")
    const [forgot, setforgot] = useState(false)
    // const [inputCode, setinputCode] = useState(null)
    // const [wrongCode, setwrongCode] = useState(false)
    const [show, setshow] = useState(false)
    let joinGroup = JSON.parse(localStorage.getItem("joinGroup"))

    useEffect(() => {
    if (loggedUser) {
        console.log(loggedUser);
        localStorage.setItem("token", JSON.stringify(loggedUser.token))
        if (joinGroup) {
            localStorage.removeItem("joinGroup")
            navigate(`/${joinGroup}`)
        }
        
    }
    }, [loggedUser])

    useEffect(() => {
      if (code) {
        console.log(code);
        navigate("/forgotpassword")
      }
    }, [code])
    
    
    const showPassword = ()=>{
        show? setshow(false): setshow(true)
        console.log(show);
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: yup.object({
            username: yup.string().min(1).required("Required"),
            password: yup.string().min(4).required("Required")
        }),
        onSubmit: (values)=> {
            console.log(values.password);
            loginUser(dispatch, values)
        }
    })
    const forgotPassword = (e)=>{
        e.preventDefault()
        // let code = Math.floor(100000 + Math.random() * 900000)
        console.log(forgot, gmail);
        if (!forgot) {
            setforgot(true)
        }else {
            let email = {email: gmail}
            localStorage.setItem("email", JSON.stringify(gmail))
            sendCode(dispatch, email)
        }
    }
    const goback = ()=>{
        if (forgot) {
            setforgot(false)
        } else {
            navigate(-1)
        }
    }
  return (
    <>
        <div className='d-flex justify-content-center align-items-center w-100 h-100 form'>
            {/* <ToastContainer /> */}
            <form onSubmit={formik.handleSubmit} className='theForm form-control d-flex flex-column gap-4 align-items-center p-4 position-relative'>
                {loggedUser && <small className={loggedUser.status? "alert alert-success italic": "alert alert-danger italic"}>{loggedUser.message}</small>}
                {loginFailed ? <small className="alert alert-danger italic">{loginFailed}</small>: fetchingCodeFailed? <small className="alert alert-danger italic">{fetchingCodeFailed}</small>: undefined}
                <button type='button' onClick={goback} className='h1 btn position-absolute top-0 left-0'>←</button>
                <h4 className={isLogging?'d-flex align-items-end gap-3 title': 'd-flex align-items-end gap-3'}>
                    {/* {isLogging&& <div className='spinner-grow button'> */}
                    {/* <img src={require("../images/favicon.ico")} width="40px" alt="" />&nbsp; */}
                    {/* </div>} */}
                    {forgot? "Recover account": "Log In"}
                </h4>
                {
                    forgot?
                    <div className='w-75 small'>
                        <label htmlFor="email" className='small'>Enter your Email address</label>
                        <input type="email" name="username" id="email" onChange={(e)=>setgmail(e.target.value)} className={"form-control rounded-3 input"} />
                        {/* {forgot? undefined: <small className="text-danger italic">{formik.errors.username}</small>} */}
                    </div>:
                    <div className='w-75 small'>
                        <label htmlFor="email">Username/Email</label>
                        <input type={forgot?"email":"text"} name="username" id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className={formik.errors.username ?"form-control rounded-3 input is-invalid": formik.errors.email ? "form-control rounded-3 input is-invalid": "form-control rounded-3 input"} />
                        <small className="text-danger italic">{formik.errors.username}</small>
                    </div>
                }
                
                {
                    forgot ? undefined:
                    <div className='w-75 small'>
                        <label htmlFor="password">Password</label>
                        <div className={formik.errors.password?"form-control is-invalid rounded-3 d-flex":"form-control rounded-3 d-flex"}>
                            <input className="w-100 password" name="password" id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} type={show?"text":"password"} />
                            <button type='button' onClick={showPassword} className={formik.values.password?'btn bg-transparent password':'btn bg-transparent password d-none'}>
                                {show?<FaEyeSlash />: <FaEye />}
                            </button>
                        </div>
                        {/* <input type="password" name="password" id="password" className={formik.errors.password?"form-control rounded-3 input is-invalid":"form-control rounded-3 input"} /> */}
                        <small className="text-danger italic">{formik.errors.password}</small>
                    </div>
                }{
                    forgot ? undefined:
                    <button type='submit' className='form-control text-white button rounded-3 w-75'>Log In</button>
                }
                <button type='button' onClick={forgotPassword} className='btn small link'>{forgot? "Verify" : "Forgot password?"}</button>
                <small>Don't have an account? <Link className='link' to={'/createaccount'}>Sign Up</Link></small>
            </form>
        </div>
    </>
  )
}

export default LogIn