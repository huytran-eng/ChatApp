
import { useState, useContext, useEffect } from 'react'
import ChatBox from "../components/ChatBox";
import "./ChatPage.css"
import MyChats from "../components/MyChats";
import NavBar from '../components/NavBar'
import { useNavigate } from "react-router-dom";
import { ChatContext, AppContext } from '../context';
import Popup from '../components/Popup';
import { Button } from "react-bootstrap";

function ChatPage() {
    const [selectedChat, setselectedChat] = useState()
    const [message, setMessage] = useState()
    const navigate = useNavigate()
    const { socket, auser, acalled, acaller } = useContext(AppContext)
    const [called, setCalled] = acalled
    const [user, setUser] = auser
    const [caller, setCaller] = acaller
    const [callRoom, setCallRoom] = useState()

    const accept = () => {
        sessionStorage.setItem("callerInfo", caller);
        window.open(`/call/${callRoom}`, '', 'toolbar=0,status=0,width=548,height=325');
        setCalled(!called);
    }
    const decline = () => {
        setCalled(!called);
        socket.emit('decline-call', user, caller)
    }
    useEffect(() => {
        socket.on('recieve-call', (u, c) => {
            setCaller(u)
            setCallRoom(c)
            setCalled(true)
        })
    }, [])
    return (
        <ChatContext.Provider value={{
            chat: [selectedChat, setselectedChat],
            cmessage: [message, setMessage]
        }}>
            {
                <>
                    <NavBar />
                    <div className="messenger">
                        <div className="chatMenu">
                            <div className="chatMenuWrapper">
                                {user && <MyChats />}
                            </div>
                        </div>
                        <div className="chatBox">
                            <div className="chatBoxWrapper">
                                {user && (
                                    <ChatBox />)}
                            </div>
                        </div>
                    </div>
                    {called && <Popup
                        content={<>
                            <div>{caller + ' dang goi'}</div>
                            <Button variant="primary" onClick={accept}>
                                Tra loi
                            </Button>
                            <Button variant="danger" onClick={decline}>
                                Tu choi
                            </Button>
                        </>}
                        handleClose={decline}
                    />}
                </>
            }
        </ChatContext.Provider>
    );

}

export default ChatPage;