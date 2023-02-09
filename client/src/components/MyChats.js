import React, { useContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { getSender } from "../config/ChatLogic"
import { Card } from "react-bootstrap";
import './MyChats.css'
import { ChatContext, AppContext } from "../context"
function MyChats() {

    const [search, setSearch] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const chatRef = useRef()
    const { chat, cmessage } = useContext(ChatContext);
    const [selectedChat, setSelectedChat] = chat
    const [message, setMessage] = cmessage
    const { socket, auser } = useContext(AppContext)
    const [user, setUser] = auser

    const [chats, setChats] = useState(null)
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get("http://localhost:5000/chat", config);
            setChats(data);
        } catch (error) {
            console.log(error);
        }
    };
    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`http://localhost:5000/chat`, { userId }, config);
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
        } catch (error) {
            console.log(error)
        }
    };

    const handleSearch = async (event) => {
        if (search)
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`http://localhost:5000/user?search=${search}`, config);
                setSearchResult(data);
            } catch (error) {
                console.log(error)
            }
    };
    useEffect(() => {
        socket.on("message-recieved", (message) => {
            console.log('nhan dc tin nhan')
            fetchChats()
        })
        fetchChats();
    }, [])

    useEffect(() => {
        if (message == "") {
            fetchChats();
        }
    }, [message])

    return (
        <div>
            <div className='Sidebar'>
                <div className='Search-bar'>
                    <div className='input'>
                        <input placeholder="Search for friends" className="chatMenuInput" onChange={(e) => setSearch(e.target.value)} />
                        <div className="searchIcon">
                            {searchResult.length === 0 ? (
                                <button onClick={handleSearch}>Go</button>
                            ) : (
                                <button onClick={() => setSearchResult([])}>Xoa</button>
                            )}
                        </div>
                    </div>
                    {searchResult.length > 0 ? (
                        <Card className="dataResult">
                            {searchResult.slice(0, 15).map((user) => (
                                <div key={user._id} onClick={() => accessChat(user._id)} >
                                    {user.username}
                                </div>
                            ))}
                        </Card>
                    ) : ""}
                </div>
                {chats ? (
                    <div>
                        {chats.map((chat) => (
                            <Card className='chat' onClick={() => {
                                setSelectedChat(chat)
                            }}>
                                <div>
                                    {!chat.isGroupChat
                                        ? getSender(user, chat.users)
                                        : chat.chatName}
                                </div>
                                {chat.latestMessage && (
                                    <div ref={chatRef} fontSize="xs">
                                        <b>{chat.latestMessage.author.username} : </b>
                                        {chat.latestMessage.text.length > 50
                                            ? chat.latestMessage.text.substring(0, 51) + "..."
                                            : chat.latestMessage.text}
                                    </div>
                                )}
                            </Card>

                        ))}
                    </div>
                ) : (
                    <div>Khong tim thay</div>
                )}
            </div>

        </div >
    )
}

export default MyChats