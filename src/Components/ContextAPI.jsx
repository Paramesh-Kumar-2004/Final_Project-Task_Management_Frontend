import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const Store = createContext()


const ContextAPI = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [task, setTask] = useState([]);
    const [taskDetail, setTaskDetail] = useState([]);
    const [collaborations, setCollaborations] = useState([])
    const [comments, setComments] = useState([])
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")
    const [deleteData, setDeleteData] = useState([])
    const [refetch, setRefetch] = useState(false)


    return (
        <Store.Provider value={{
            isLoading, setIsLoading,
            task, setTask,
            taskDetail, setTaskDetail,
            collaborations, setCollaborations,
            comments, setComments,
            search, setSearch,
            filter, setFilter,
            deleteData, setDeleteData,
            refetch, setRefetch
        }}>
            {children}
        </Store.Provider>
    )
}

export default ContextAPI