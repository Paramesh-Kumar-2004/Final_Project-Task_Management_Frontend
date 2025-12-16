import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ContextAPI from './Components/ContextAPI'
import CreateTasks from './Pages/Task/CreateTasks'
import EditTask from './Pages/Task/EditTask'
import Tasks from './Pages/Task/Tasks'
import Collaborations from './Pages/Collobaration/Collaborations'
import CollaborationDetails from './Pages/Collobaration/CollaborationDetails'
import Settings from './Pages/Settings'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ForgetPassword from './Pages/Auth/ForgetPassword'
import ResetPassword from './Pages/Auth/ResetPassword'
import NotFound from './Pages/NotFound'
import TaskDetails from './Pages/Task/TaskDetails'



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
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/edit-task/:taskId' element={<EditTask />} />
            <Route path='/task/:taskid' element={<TaskDetails />} />
            <Route path='/collaborations' element={<Collaborations />} />
            <Route path='/collaboration/:id' element={<CollaborationDetails />} />
            <Route path='/settings' element={<Settings />} />

            <Route path='*' element={<NotFound />} />

          </Routes>
        </HashRouter>

      </ContextAPI>
    </>
  )
}

export default App