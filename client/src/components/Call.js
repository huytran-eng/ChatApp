import Peer from 'peerjs';
import React, { useState, useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { AppContext, ChatContext } from '../context';
import './Call.css'



function Call() {
    const [stream, setStream] = useState()
    const [me, setMe] = useState()
    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const { roomId } = useParams();
    const { socket, auser } = useContext(AppContext)
    const [user, setUser] = auser
    const navigate = useNavigate()
    const [otherUser, setOtherUser] = useState()
    const leaveCall = () => {
        socket.emit('leave-call', user, roomId)
        me.disconnect()
        window.close()
    }
    useEffect(() => {
        const a = sessionStorage.getItem('callerInfo');
        if (a) {
            console.log(a)
            setOtherUser(a)
            sessionStorage.removeItem('callerInfo');
        }
        const peer = new Peer(user._id, {
            host: "localhost",
            port: 9000,
            path: "/myapp"
        });
        setMe(peer)
        try {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    myVideo.current.srcObject = currentStream;
                    setStream(currentStream);
                });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (!me || !stream) return;
        socket.emit('join-vid', user, roomId)
        socket.on('join-vid', (u) => {
            setOtherUser(u.username)
            const call = me.call(u._id, stream)
            call.on('stream', userStream => {
                userVideo.current.srcObject = userStream;
            });
        })
        socket.on('call-ended', () => {
            me.disconnect()
            window.close()
        })
        socket.on('call-declined', () => {

            me.disconnect()
            window.close()
        })
        me.on('call', call => {
            call.answer(stream);
            call.on('stream', function (userStream) {
                userVideo.current.srcObject = userStream;
            });
        });
        me.on('close', () => {
            socket.emit('leave-call', user)
        })
    }, [me, stream, socket]);

    return (
        < Container >

            <div className='row'>
                {user ? (
                    <div className=' column'>

                        <video width="100%" height="100%" ref={myVideo} muted autoPlay />
                        <p>{user.username}</p>
                        <button onClick={leaveCall}>Ket thuc</button>

                    </div>)
                    : ("")}
                {otherUser ? (
                    <div className='column'>
                        < video width="100%" height="100%" ref={userVideo} muted autoPlay />
                        <p>{otherUser}</p>
                    </div>)
                    : ("")}

            </div>



        </Container >

    );
}

export default Call


