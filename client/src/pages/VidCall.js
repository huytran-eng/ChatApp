import Peer from 'peerjs';
import React, { useState, useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context';
import NavBar from '../components/NavBar'
import Call from "../components/Call";




function VidCall() {

    const { auser } = useContext(AppContext)
    const [user, setUser] = auser
    return (
        < Container >

            {user && (
                <Call />)}
        </Container>

    );
}

export default VidCall


