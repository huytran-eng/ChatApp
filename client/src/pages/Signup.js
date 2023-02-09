import React, { useState } from 'react'
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSignup(e) {
        e.preventDefault();
        // Signup logic
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/user/signup",
                { username, email, password },
                config
            );
            if (data) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/chat");
            }
        } catch (error) {
            console.log(error)
            if (error.response.status == 409) alert("User already exists")
        }
    }
    return (

        < Container >
            <Col className="d-flex align-items-center justify-content-center flex-direction-column">
                <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                    <div className="py-4">
                        <p className="text-center">
                            Already have an account ? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </Form>
            </Col>
        </Container >
    );
}

export default Signup