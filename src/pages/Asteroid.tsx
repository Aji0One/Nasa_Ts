import React, { useState, useEffect } from 'react'
import "../styles/Asteroid.css";
import { useLocation } from "react-router-dom";
import Loading from '../Component/components/Loading';
import { Box, CircularProgress } from '@mui/material';

interface asteroidProps {
    name: string,
    nasa_jpl: string,
    isHazard: boolean
}

const Asteroid = () => {
    const { state } = useLocation();
    const [astroidData, setAsteroidData] = useState<asteroidProps>();
    const [warning, setWarning] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setAsteroidData({
            name: state?.name,
            nasa_jpl: state?.nasa_jpl_url,
            isHazard: state?.is_potentially_hazardous_asteroid
        })
        { state?.is_potentially_hazardous_asteroid ? setWarning("True") : setWarning("False") };
        setLoading(false);
    }, [state]);

    const asteroidElement = (
        <div className='cont'>
            <h4>Asteroid Info</h4>
            <ul className='mylist'>
                <li>Name: <b>{astroidData?.name}</b></li>
                <li>Nasa_Jpl_DB_Link: <span className='links'><a href={astroidData?.nasa_jpl} target='_blank'>{astroidData?.nasa_jpl}</a></span></li>
                <li data-testid="hazard">Is_Dangerous: {warning}</li>

            </ul>
        </div>
    )


    return (
        <div className='outerdiv'>
            {loading ? <Loading /> : asteroidElement}
        </div>
    )

}

export default Asteroid;
