import React, { useContext } from 'react'
import { Store } from '../Components/ContextAPI'
import SearchBar from '../Components/SearchBar'
import Cards from '../Components/Cards'



const Home = () => {

    return (
        <>
            <div className="bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif">

                <div className='py-6 pl-2'>
                    <h1 className='text-sky-400 font-bold text-3xl text-center'>My Tasks</h1>
                </div>

                <div className='mb-6'>
                    <SearchBar />
                </div>

                <div className='flex gap-4 justify-around mb-6'>
                    <div
                        className="cursor-pointer font-bold bg-sky-800 py-1 px-4 rounded-sm"
                    >Tasks</div>

                </div>

                <Cards />

            </div >
        </>
    )
}

export default Home
