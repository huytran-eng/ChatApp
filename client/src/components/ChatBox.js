import React, { useContext, useState, useEffect, useRef } from 'react'
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import "./ChatBox.css";
import axios from 'axios'
import { getSender } from "../config/ChatLogic"
import { ChatContext, AppContext } from "../context"
import { useNavigate } from 'react-router-dom';
var compareChat
function ChatBox() {
  const { chat, cmessage } = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = chat
  const [message, setMessage] = cmessage
  const [messages, setMessages] = useState([])
  const scrollRef = useRef();
  const { socket, auser } = useContext(AppContext)
  const [user, setUser] = auser
  const navigate = useNavigate()
  const handleMess = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:5000/message`, { text: message, chatId: selectedChat._id }, config);
      socket.emit('new-message', data)
      setMessages([...messages, data])
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }
  const goiThoai = () => {
    socket.emit('call', user, selectedChat)
    window.open(`/call/${selectedChat._id}`, '', 'toolbar=0,status=0,width=548,height=325');

  }

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/message/${selectedChat._id}`,
        config
      );
      setMessages(data)

    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    socket.on('message-recieved', (messageData) => {
      if (compareChat || messageData.chat._id == compareChat._id && user._id != messageData.author._id) {
        setMessages([...messages, messageData]);
      }
    })
  })
  useEffect(() => {
    fetchMessages()
    compareChat = selectedChat
  }, [selectedChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div >
        <div>
          {selectedChat ? (
            <div>
              <div>
                {selectedChat.isGroupChat ? (
                  <div className="alert alert-info conversation-info">
                    {selectedChat.chatName}
                    {selectedChat.groupAdmin._id == user._id ? (<button class="float-right">hey</button>) : ""}

                  </div>
                ) : (
                  <div className="alert alert-info conversation-info">
                    {getSender(user, selectedChat.users)}
                    (<button className="float-right" onClick={goiThoai}>goi</button>)
                  </div>
                )}

              </div>
              <div className="messages-output">

                {messages.map((message) => (
                  <div ref={scrollRef} className={message.author._id === user._id ? "send-message" : "incoming-message"} key={message._id}>
                    <div className="message-inner">
                      <div className="d-flex align-items-center mb-3">
                        <p className="message-sender">{message.author._id === user._id ? "You" : message.author.username}</p>
                      </div>
                      <p className="message-content">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
        <Form onSubmit={handleMess}>
          <Row>
            <Col md={11}>
              <Form.Group>
                <Form.Control type="text" placeholder="Your message" disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
            <Col md={1}>
              <Button variant="primary" type="submit">
                Gui
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )


}

export default ChatBox
