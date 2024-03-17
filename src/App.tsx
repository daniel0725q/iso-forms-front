import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login/Login'
import './App.css'
import { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import PageLayout from './PageLayout'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App