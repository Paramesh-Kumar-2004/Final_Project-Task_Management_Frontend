import React, { useContext, useEffect } from 'react'
import { Store } from './ContextAPI'
import { useNavigate } from 'react-router-dom'



const SearchBar = () => {

    const navigate = useNavigate()

    const { search, setSearch } = useContext(Store)

    const HandleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className='w-full flex gap-3 justify-around'>

                <input
                    className='border-2 border-sky-400 text-white rounded-md p-1 outline-sky-700 w-3/4'
                    type="text"
                    placeholder='Search Here Based On Tags & Notes...'
                    onChange={(e) => { HandleSearch(e) }}
                />

                <button
                    onClick={() => { navigate("/createTasks") }}
                    className='bg-blue-400 p-2 rounded-lg font-bold border-2 border-sky-900 text-pink-700 cursor-pointer'
                >
                    Create Task
                </button >

            </div>
        </>
    )
}

export default SearchBar