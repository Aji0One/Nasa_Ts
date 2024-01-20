import { TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "../styles/Dashboard.css";
import axios from 'axios';
import Notify from '../Component/components/Notify';
import { useNavigate } from "react-router-dom";




const Dashboard = () => {
    const navigate = useNavigate();
    const [id, setId] = useState<string>("");
    const [val, setval] = useState<boolean>();
    const [notify, setNotify] = useState(false);
    const [neodata, setNeodata] = useState<any>();


    const mykey: string = "2kcKVT2FM4lzOSNr3CpVapPrEbRVGLglBfaQtsTg";

    const handleForm = async (e: any) => {
        const myId: number = parseInt(id);
        e.preventDefault();
        if (myId % 2) {
            const res = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${mykey}`);
            console.log(res.data);
            navigate("/asteroid", { state: res.data });
        } else {
            setval(true);
            setNotify(true)
        }
    }

    const randomS = async () => {
        const search = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`);
        const res = await search.json();
        setNeodata(res);

        console.log("resoonn")
    }

    useEffect(() => {
        if (id.length > 0) {
            setval(false)
        } else {
            setval(true);
        }
    }, [id])

    useEffect(() => {
        randomS();

    }, [])

    const getRandom = () => {
        console.log(neodata);
        const x: number = Math.floor(Math.random() * neodata?.near_earth_objects.length);
        const neoId: any = neodata?.near_earth_objects[x];

        navigate("/asteroid", { state: neoId });
    }


    return (
        <div className='outer'>
            <div className='container'>
                <h2 data-testid="heading">Asteroid Search</h2>
                <form onSubmit={handleForm} data-testid="form">
                    <TextField variant='standard' className='inputF' label="Enter Asteroid ID" size="medium" onChange={(e) => setId(e.target.value)} data-testid="input" />
                    <div>
                        <Button className="submitbtn" disabled={val} type='submit' variant='contained'>Submit</Button>
                        <Button className='randomasteroid' onClick={() => getRandom()} data-testid="random_btn">Random Asteroid</Button>
                    </div>
                </form>
            </div>
            {notify && <Notify setNotify={setNotify} message="Enter Valid Id" />}
        </div>
    )
}

export default Dashboard





