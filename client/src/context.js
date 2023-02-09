import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';

import { io } from "socket.io-client";
import { createContext } from "react";
export const socket = io('http://localhost:5000/');
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const navigate = useNavigate()
    const [caller, setCaller] = useState()
    const [user, setUser] = useState("");
    const [called, setCalled] = useState(false)
    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem("userInfo"));
        setUser(curUser)
        if (curUser) socket.emit("setup", curUser)
    }, [navigate]);

    return (
        <AppContext.Provider value={{
            socket,
            auser: [user, setUser],
            acalled: [called, setCalled],
            acaller: [caller, setCaller]
        }}>
            {children}
        </AppContext.Provider >
    );
}

export const ChatContext = createContext();



