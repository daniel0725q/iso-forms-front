import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login/Login'
import './App.css'
import { useState } from 'react'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import PageLayout from './PageLayout'
import RecoverPassword from './RecoverPassword/RecoverPassword'
import ChangePassword from './ChangePassword/ChangePassword'
import Companies from './Companies/Companies'
import Users from './Users/Users'
import FormGenerator from './FormGenerator/FormGenerator'
import MyForm from './Form/Form'
import FormsDashboard from './FormsDashboard/FormsDashboard'
import FormPreview from './PDF/FormPreview'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route path="/home" element={<Home loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/forms" element={<FormsDashboard />} />
          <Route path="/forms/:id" element={<MyForm isEdit={false} />} />
          <Route path="/forms/edit/:id" element={<MyForm isEdit={true} />} />
          <Route path="/form-generator" element={<FormGenerator />} />
          <Route path="/forms/preview/:id" element={<FormPreview />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App