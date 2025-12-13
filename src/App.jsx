import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ContextAPI from './Components/ContextAPI'
import CreateTasks from './Pages/CreateTasks'
import EditTask from './Pages/EditTask'
import Sidebar from './Components/Sidebar'
import Tasks from './Pages/Tasks'
import Collaborations from './Pages/Collaborations'
import Settings from './Pages/Settings'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ForgetPassword from './Pages/ForgetPassword'
import ResetPassword from './Pages/ResetPassword'
import { ToastContainer } from 'react-toastify'



const App = () => {

  return (
    <>
      <ContextAPI >

        <HashRouter>
          <ToastContainer />
          <Routes>

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/createTasks' element={<CreateTasks />} />
            <Route path='/edit-task' element={<EditTask />} />
            <Route path='/taks' element={<Tasks />} />
            <Route path='/collaborations' element={<Collaborations />} />
            <Route path='/settings' element={<Settings />} />

          </Routes>
        </HashRouter>

      </ContextAPI>
    </>
  )
}

export default App