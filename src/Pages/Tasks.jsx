import React from 'react'
import Sidebar from '../Components/Sidebar'

const Tasks = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full bg-[#1B262C] flex justify-center items-center text-white'>
                Task
            </div>
        </div>
    )
}

export default Tasks