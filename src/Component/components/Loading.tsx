import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "../styles/Loading.css";

// interface LoadingProps {
//     setLoading: (active: boolean) => void;
// }

export default function Loading() {

    return (
        <div className='loading'>
            <Box sx={{ display: 'flex' }} className="load">
                <CircularProgress />
            </Box>
        </div>
    );
}
