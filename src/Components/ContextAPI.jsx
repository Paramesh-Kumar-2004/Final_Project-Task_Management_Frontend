import React, { createContext, useEffect, useState } from 'react'


export const Store = createContext()


const ContextAPI = ({ children }) => {

    const [task, setTask] = useState(JSON.parse(localStorage.getItem("task")) || []);
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")

    const allCount = task.reduce((count, ele) => {
        return ele.type === "all" ? count + 1 : count;
    }, 0);

    const pinnedCount = task.reduce((count, ele) => {
        return ele.type === "pin" ? count + 1 : count;
    }, 0);

    const archiveCount = task.reduce((count, ele) => {
        return ele.type === "archive" ? count + 1 : count;
    }, 0);

    const deleteCount = task.reduce((count, ele) => {
        return ele.type === "trash" ? count + 1 : count;
    }, 0);




    return (
        <Store.Provider value={{
            task, setTask,
            search, setSearch,
            filter, setFilter,
            allCount, archiveCount, pinnedCount, deleteCount
        }}>
            {children}
        </Store.Provider>
    )
}

export default ContextAPI