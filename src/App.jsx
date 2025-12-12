import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ContextAPI from './Components/ContextAPI'
import CreateTasks from './Pages/CreateTasks'
import EditTask from './Pages/EditTask'
import Sidebar from './Components/Sidebar'
import Tasks from './Pages/Tasks'



const App = () => {

  return (
    <>
      <ContextAPI >

        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createTasks' element={<CreateTasks />} />
            <Route path='/edit-task/:id' element={<EditTask />} />
            <Route path='/taks' element={<Tasks />} />
          </Routes>
        </HashRouter>

      </ContextAPI>
    </>
  )
}

export default App