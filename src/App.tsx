import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login/Login'
import './App.css'
import { useEffect, useState } from 'react'
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
import HomeNumberTwo from './HomeNumberTwo/HomeNumberTwo'
import MyFormsDashboard from './MyFormsDashboard/MyFormsDashboard'
import MiscFormsDashboard from './MiscDashboard/MiscDashboard'
import axios from 'axios'
import FormCopy from './FormCopy/FormCopy'
import FormEditor from './FormEditor/FormEditor'
import DiagramEditor from './ProcessMap/Editor'
import MyFormEdit from './Form/FormEdit'
import CompareForms from './CompareForms/CompareForms'
import Editor from './ProcessMap/Editor'
import Viewer from './ProcessMap/Viewer'
import DiagramsDashboard from './DiagramsDashboard/DiagramsDashboard'
import PaymentsDashboard from './PaymentsDashboard/PaymentsDashboard'
import Sidebar from './Sidebar/Sidebar'

function AuthErrorPage() {
  return <h1>Acceso no autorizado! Verifica tu contraseña o ingresa nuevamente.</h1>;
}

function ServerErrorPage() {
  return <h1>Error de servidor! Intenta nuevamente o contacta al administrador</h1>;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          // Redirect to error page if 401 status is received
          window.location.href = '/auth-error';
        } else if (error.response && error.response.status === 500) {
          
        }
        return Promise.reject(error);
      }
    )
    return () => {
      // Remove the interceptor when component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route index element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/home" element={<Home loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<Users setEmail={setEmail}/>} />
          <Route path="/options" element={<HomeNumberTwo />} />
          <Route path="/forms" element={<FormsDashboard />} />
          <Route path="/miscellaneous-documents" element={<MiscFormsDashboard />} />
          <Route path="/my-forms" element={<MyFormsDashboard />} />
          <Route path="/forms/:id" element={<MyForm isEdit={false} />} />
          <Route path="/forms/:id/copy" element={<FormCopy />} />
          <Route path="/forms/:id/edit/:template" element={<FormEditor />} />
          <Route path="/forms/:id/edit" element={<FormEditor />} />
          <Route path="/forms/edit/:id" element={<MyForm isEdit={true} />} />
          <Route path="/forms/edit/:id/:template" element={<MyFormEdit isEdit={true} />} />
          <Route path="/form-generator" element={<FormGenerator />} />
          <Route path="/forms/preview/:id" element={<FormPreview />} />
          <Route path="/auth-error" element={<AuthErrorPage />} />
          <Route path="/internal-error" element={<ServerErrorPage />} />
          <Route path="/process-editor" element={<Editor />} />
          <Route path="/process-editor/:id" element={<Editor />} />
          <Route path="/process-map/:id" element={<Viewer xml='' />} />
          <Route path="/compare" element={<CompareForms />} />
          <Route path="/diagrams" element={<DiagramsDashboard />} />
          <Route path="/payments" element={<PaymentsDashboard />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App