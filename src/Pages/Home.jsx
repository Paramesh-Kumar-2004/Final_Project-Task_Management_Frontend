import React, { useContext } from 'react'
import { Store } from '../Components/ContextAPI'
import SearchBar from '../Components/SearchBar'
import Cards from '../Components/Cards'


const Home = () => {

    const { allCount, archiveCount, pinnedCount, deleteCount, filter, setFilter } = useContext(Store)

    function HandleFilter(data) {
        try {
            setFilter(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif">

                <div className='py-6 pl-2'>
                    <h1 className='font-bold text-3xl'>My Notes</h1>
                    <p className='text-gray-500'>Add Your Tasks Here...</p>
                </div>

                <div className='mb-6'>
                    <SearchBar />
                </div>

                <div className='flex gap-4 justify-around mb-6'>
                    <div
                        onClick={() => HandleFilter("all")}
                        className={filter === "all" ? 'cursor-pointer font-bold bg-green-600 p-1 rounded-sm' : "cursor-pointer font-bold"}
                    >All ({allCount})</div>

                    <div
                        onClick={() => HandleFilter("pin")}
                        className={filter === "pin" ? 'cursor-pointer font-bold bg-green-600 p-1 rounded-sm' : "cursor-pointer font-bold"}
                    >Pinned ({pinnedCount})</div>

                    <div
                        onClick={() => HandleFilter("archive")}
                        className={filter === "archive" ? 'cursor-pointer font-bold bg-green-600 p-1 rounded-sm' : "cursor-pointer font-bold"}
                    >Archive ({archiveCount})</div>

                    <div
                        onClick={() => HandleFilter("trash")}
                        className={filter === "trash" ? 'cursor-pointer font-bold bg-green-600 p-1 rounded-sm' : "cursor-pointer font-bold"}
                    >Deleted ({deleteCount})</div>

                </div>

                <Cards />

            </div>
        </>
    )
}

export default Home