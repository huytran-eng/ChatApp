import React, { useState, useContext, useEffect } from 'react'

import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AppContext } from '../context';



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { socket, auser } = useContext(AppContext)
    const [user, setUser] = auser

    const navigate = useNavigate();
    async function handleLogin(e) {
        try {
            e.preventDefault();
            // login logic
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/user/login",
                { email, password },
                config
            );
            if (data) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                const curUser = JSON.parse(localStorage.getItem("userInfo"));
                setUser(curUser);
                if (curUser) socket.emit("setup", (data))
                navigate("/chat");
            }
        }
        catch (error) {
            if (error.response.status == 401) alert("Invalid Email or Password")
        }



    }
    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem("userInfo"));
        console.log(curUser)
        if (curUser) navigate("/chat")
    }, [])
    return (
        < Container >
            <Col className="d-flex align-items-center justify-content-center flex-direction-column">
                <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <div className="py-4">
                        <p className="text-center">
                            Don't have an account ? <Link to="/signup">Signup</Link>
                        </p>
                    </div>
                </Form>
            </Col>
        </Container >
    );
}

export default Login