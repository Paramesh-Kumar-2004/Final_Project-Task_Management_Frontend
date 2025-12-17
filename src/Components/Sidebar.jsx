import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const Sidebar = () => {

    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false)

    return (
        <nav className='bg-[#06344d] h-screen min-w-36 w-fit flex flex-col justify-evenly py-4 items-center text-white fixed'>
            <div>
                {/* <img src={testIMG} alt="img" width={50} /> */}
                <h1 className='text-center'>VP</h1>
            </div>
            <div
                onClick={() => navigate("/")}
                className='font-semibold text-lg p-2 cursor-pointer'>Dashboard</div>
            <div
                onClick={() => navigate("/tasks")}
                className='font-semibold text-lg p-2 cursor-pointer'>Tasks</div>
            <div
                onClick={() => navigate("/createTasks")}
                className='font-semibold text-lg p-2 cursor-pointer'>Create Task</div>
            <div
                onClick={() => navigate("/shared-tasks")}
                className='font-semibold text-lg p-2 cursor-pointer'>Collaborations</div>
            <div
                onClick={() => navigate("/settings")}
                className='font-semibold text-lg p-2 cursor-pointer'>Settings</div>
        </nav>
    )
}

export default Sidebar