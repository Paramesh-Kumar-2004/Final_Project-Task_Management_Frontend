import React from 'react'
import { useNavigate } from 'react-router-dom'



const Sidebar = () => {

    const navigate = useNavigate()

    return (
        <nav className='bg-[#0f4c7546] min-h-screen min-w-32 w-fit flex flex-col justify-evenly py-4 items-center'>
            <div>
                {/* <img src={testIMG} alt="img" width={50} /> */}
                <h1 className='text-center'>VP</h1>
            </div>
            <div
                onClick={() => navigate("/")}
                className='font-semibold text-lg p-2 cursor-pointer'>Dashboard</div>
            <div
                onClick={() => navigate("/createTasks")}
                className='font-semibold text-lg p-2 cursor-pointer'>Create Task</div>
            <div
                onClick={() => navigate("/taks")}
                className='font-semibold text-lg p-2 cursor-pointer'>View Tasks</div>
            <div
                onClick={() => navigate("/collaborations")}
                className='font-semibold text-lg p-2 cursor-pointer'>View Collaborations</div>
            <div
                onClick={() => navigate("/settings")}
                className='font-semibold text-lg p-2 cursor-pointer'>Settings</div>
        </nav>
    )
}

export default Sidebar