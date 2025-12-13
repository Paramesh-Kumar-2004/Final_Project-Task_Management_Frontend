import React from 'react'
import Sidebar from '../../Components/Sidebar'

const TaskDetails = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full min-h-screen bg-[#1B262C] flex flex-col justify-between items-center text-white pl-40 py-3'>

                {/* Task */}
                <div>
                    Task
                </div>

                {/* Collaborations */}
                <div>
                    Collaborations
                </div>

                {/* Comments */}
                <div>
                    Comments
                </div>

            </div>
        </div>
    )
}

export default TaskDetails