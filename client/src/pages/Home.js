import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem("userInfo"));
        console.log(curUser)
        if (curUser) navigate("/chat")
    }, [])
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">welcome to our app</h1>
            <Link to="/login">
                <button className="primary-button">Log in</button>
            </Link>
        </div>

    )
}

export default Home