import './App.css';
import { Route, Routes } from 'react-router-dom';
import socketClient from 'socket.io-client'
import LandingPage from './Components/LandingPage';
import LogIn from './forms/LogIn';
import CreateThrift from './forms/CreateThrift';
import SignUp from './forms/SignUp';
import Dashboard from './Components/dashboard/Dashboard';
import DashboardHome from './Components/dashboard/DashboardHome';
import Transaction from './Components/dashboard/Transaction';
import Groups from './Components/dashboard/Groups';
import MyGroups from './Components/dashboard/MyGroups';
import SharedGroups from './Components/dashboard/SharedGroups';
import OneGroup from './Components/dashboard/OneGroup';
import Invite from './Components/dashboard/Invite';
import { useEffect, useRef } from 'react';
import Notifications from './Components/dashboard/Notifications';
import ForgotPassword from './forms/ForgotPassword';

function App() {
  let socket = useRef()
  let endpoint = "http://localhost:2000"
  useEffect(() => {
    socket.current = socketClient(endpoint)
  }, [])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/forgotpassword' element={<ForgotPassword /> } />
        <Route path='/createaccount' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='' element={<DashboardHome />} />
          <Route path='notifications' element={<Notifications socket={socket} />} />
          <Route path='createthrift' element={<CreateThrift />} />
          <Route path='groups' element={<Groups />} >
            <Route path='owned' element={<MyGroups />} />
            <Route path='' element={<SharedGroups />} />
            <Route path='owned/:id' element={<OneGroup />} />
            <Route path=':id' element={<OneGroup />} />
            {/* <Route path=':id/invite' element={<Invite />} /> */}
            {/* <Route path='createthrift' navigateTo={"/dashboard/createthrift"} /> */}
          </Route>
          <Route path='transactions' element={<Transaction />} />
        </Route>
        <Route path='/:id' element={<Invite socket={socket} />} />
      </Routes>
    </>
  );
}

export default App;
