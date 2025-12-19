import React, { useContext } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Store } from '../ContextAPI';




export const Paginate = () => {

    const { paginate, setPaginate } = useContext(Store)

    return (
        <div className="text-white">
            <Stack spacing={2}>
                <Pagination
                    count={10}
                    page={paginate}
                    onChange={(e, value) => setPaginate(value)}
                    color="primary"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                            fontSize: 18
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'blue !important',
                            color: 'white !important',
                        },
                        '& .MuiPaginationItem-root:hover': {
                            backgroundColor: '#4A70A9',
                            color: 'white',
                        }
                    }}
                />
            </Stack>
        </div>
    );
}