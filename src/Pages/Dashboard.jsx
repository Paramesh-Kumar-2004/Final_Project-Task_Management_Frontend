import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Charts from '../Components/Charts/Charts'




const Dashboard = () => {

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full min-h-screen bg-[#1B262C] flex justify-center items-center text-white pl-40'>
                <Charts />
            </div>
        </div>
    )
}

export default Dashboard