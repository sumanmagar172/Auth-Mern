import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import RefreshHandler from './RefreshHandler'

const App = () => {
  const [isAuth, setIsAuth] = useState(false)
  const PrivateRoute = ({element}) => {
    return isAuth ? element : <Navigate to='/login'/>
  }
  return (
      <div>
        <RefreshHandler setIsAuth={setIsAuth}/>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<PrivateRoute element={<Home/>} />} />
        </Routes>
      </div>
  )
}

export default App
