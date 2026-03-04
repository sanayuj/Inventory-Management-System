import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginPage from '../Pages/LoginPage'
function UserRoute() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/>}x/>
    </Routes>
  )
}

export default UserRoute