import React from 'react'
import Sidebar from '../Components/Sidebar'



const Settings = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full min-h-screen bg-[#1B262C] flex justify-center items-center text-white pl-40'>
                Settings
            </div>
        </div>
    )
}

export default Settings