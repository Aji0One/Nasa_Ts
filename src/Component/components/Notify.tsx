import React, { useEffect } from "react";
import "../styles/Notify.css";

interface notifyprops {
    setNotify: (active: boolean) => void;
    message: string
}


const Notify = ({ setNotify, message }: notifyprops) => {
    useEffect(() => {
        setTimeout(() => setNotify(false), 2200);
    });
    return <div className="notify">{message}</div>;
};

export default Notify;