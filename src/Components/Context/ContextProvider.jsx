import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { Store } from './Store';



const ContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [task, setTask] = useState([]);
    const [taskDetail, setTaskDetail] = useState([]);
    const [sharedWithTask, setSharedWithTask] = useState([])
    const [comments, setComments] = useState([])
    const [deleteData, setDeleteData] = useState([])
    const [refetch, setRefetch] = useState(false)
    const [users, setUsers] = useState([])

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [paginate, setPaginate] = useState(1);
    const [page, setPage] = useState(1);

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await API.get("/auth/getusers")
            setUsers(response.data.users)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Store.Provider value={{
            isLoading, setIsLoading,
            task, setTask,
            users, setUsers,
            taskDetail, setTaskDetail,
            sharedWithTask, setSharedWithTask,
            comments, setComments,
            deleteData, setDeleteData,
            refetch, setRefetch,
            search, setSearch,
            status, setStatus,
            paginate, setPaginate,
            priority, setPriority,
            page, setPage,
            fetchUsers
        }}>
            {children}
        </Store.Provider>
    )
}

export default ContextProvider