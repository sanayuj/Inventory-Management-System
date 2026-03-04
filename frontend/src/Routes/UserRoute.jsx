import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginPage from '../Pages/LoginPage'
import DashboardPage from '../Pages/DashboardPage'
function UserRoute() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/>}x/>
        <Route path='/Dashboard' element={<DashboardPage/>}/>
    </Routes>
  )
}

export default UserRoute