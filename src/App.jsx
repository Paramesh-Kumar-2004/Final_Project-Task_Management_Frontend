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



const App = () => {

  return (
    <>
      <ContextAPI >

        <HashRouter>
          <Routes>
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