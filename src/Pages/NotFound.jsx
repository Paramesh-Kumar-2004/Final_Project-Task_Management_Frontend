import React from 'react'
import Sidebar from '../Components/Sidebar'



const NotFound = () => {

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full bg-[#1B262C] flex justify-center items-center text-white'>
                Page Not Found
            </div>
        </div>
    )
}

export default NotFound