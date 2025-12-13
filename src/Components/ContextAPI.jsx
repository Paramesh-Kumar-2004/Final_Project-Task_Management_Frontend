import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const Store = createContext()


const ContextAPI = ({ children }) => {

    const [task, setTask] = useState([]);
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")
    const [deleteData, setDeleteData] = useState([])


    return (
        <Store.Provider value={{
            task, setTask,
            search, setSearch,
            filter, setFilter,
            deleteData, setDeleteData,
        }}>
            {children}
        </Store.Provider>
    )
}

export default ContextAPI