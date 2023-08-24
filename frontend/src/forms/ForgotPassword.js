import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { ToastContainer, toast } from 'react-toastify'
import { sendCode, setNewPassword } from '../services/Controls'
import { nullifyCode, nullifyPassword } from '../Redux/forgotPasswordSlice'

function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const { isFetchingCode, code, fetchingCodeFailed, isSettingPassword, setPassword, settingPasswordFailed } = useSelector((state)=>state.forgotPasswordSlice)
    const [codeChanged, setcodeChanged] = useState(false)
    const [inputCode, setinputCode] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [wrongCode, setwrongCode] = useState(false)
    const [verified, setverified] = useState(false)

    useEffect(() => {
        setcodeChanged(true)
      if (code) {
        setTimeout(() => {
          dispatch(nullifyPassword())
        }, 600000);
      }
    }, [code])
    

    useEffect(() => {
      if (setPassword) {
        toast.success(setPassword.meaasge)
        localStorage.removeItem("email")
        localStorage.setItem("token", JSON.stringify(setPassword.token))
        navigate("/dashboard")
      }
    }, [setPassword])

    useEffect(() => {
      if (settingPasswordFailed) {
        toast.error(settingPasswordFailed)
        // localStorage.removeItem("email")
      }
    }, [settingPasswordFailed])
    

    const goback = ()=>{
      // console.log(window.location)
      // history.back()
      navigate(-1)
    }
    const verifyCode = ()=>{
      console.log(inputCode, code);
      if (Number(inputCode) === code) {
        setverified(true)
        dispatch(nullifyCode())
      } else {
        toast.error("Wrong code")
        setverified(false)
      }
    }
    const submitNewPassword = ()=>{
      console.log(newpassword);
      if (newpassword.length < 4) {
        toast.error("Password is too short")
      } else {
        let gmail = JSON.parse(localStorage.getItem("email"))
        let details = {
          email: gmail,
          newPassword: newpassword
        }
        setNewPassword(dispatch, details)
      }
    }
    const resendCode = ()=>{
      let gmail = JSON.parse(localStorage.getItem("email"))
      let email = {email: gmail}
      // console.log(email);
      sendCode(dispatch, email)
    }
  return (
    <>
        <div className='d-flex justify-content-center align-items-center w-100 h-100 form'>
          <ToastContainer />
            <form className='theForm form-control d-flex flex-column gap-4 align-items-center p-4 position-relative'>
              <button onClick={goback} className='h1 btn'>←</button>
              <h4>Recover account</h4>
              {
                verified?
                <div>
                  <label htmlFor="code" className='small'>Enter your new password</label>
                  <input type="password" name="newPassword" id="newPassword" onChange={(e)=>setnewpassword(e.target.value)} className={wrongCode? "form-control rounded-3 input" : "form-control rounded-3 input "} />
                </div>:
                <div>
                  <label htmlFor="code" className='small'>Enter the 6-digits code we sent to your Email address</label>
                  <input type="number" name="code" id="code" onChange={(e)=>setinputCode(e.target.value)} className={wrongCode? "form-control rounded-3 input" : "form-control rounded-3 input "} />
                  {/* {forgot? undefined: <small className="text-danger italic">{formik.errors.username}</small>} */}
                </div>
              }
              {
                (!codeChanged && code) ?
                <div className='d-flex align-items-center justify-content-around'>
                  <span>Your code will expire in</span>
                  <span></span>
                </div>: (codeChanged && code) ?
                <div className='d-flex align-items-center justify-content-around'>
                  <span>Your new code will expire in</span>
                  <span></span>
                </div>: (codeChanged && !code && !verified) ?
                <div className='d-flex align-items-center justify-content-around'>
                  <span>Your code has expired</span>
                  <button type='button' onClick={resendCode}>Resend code</button>
                </div>: (codeChanged && !code && verified)?
                <small>Password length must be up to four characters</small>:
                undefined
              }
              <button type='button' onClick={verified? submitNewPassword : verifyCode} className='btn small link'>{verified? "Submit": "Verify"}</button>
            </form>
        </div>
    </>
  )
}

export default ForgotPassword