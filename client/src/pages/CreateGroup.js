import React, { useState, useContext } from 'react'
import { Card } from "react-bootstrap";

import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AppContext } from '../context';



function CreateGroup() {
    const [search, setSearch] = useState([])
    const { auser } = useContext(AppContext)
    const [user, setUser] = auser

    const [searchResult, setSearchResult] = useState([])
    const navigate = useNavigate();
    const [tenNhom, settenNhom] = useState("")
    const [thanhVien, setthanhVien] = useState("")
    const [toanBo, setToanBo] = useState([])
    const handleSearch = async (event) => {
        setSearch(event)
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
    const addToGroup = async (e, u) => {
        e.preventDefault()
        if (toanBo.filter(v => v._id == u._id).length == 0)
            setToanBo([...toanBo, u])
    }
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post("http://localhost:5000/chat/group", { name: tenNhom, users: toanBo }, config);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        < Container >


            <Col className="d-flex align-items-center justify-content-center flex-direction-column">

                <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleCreate} >
                    <Form.Group className="mb-3" controlId="tenNhom">
                        <Form.Label>Ten Nhom</Form.Label>
                        <Form.Control type="text" placeholder="Nhap ten nhom " onChange={(e) => settenNhom(e.target.value)} value={tenNhom} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="thanhVien">
                        <Form.Label>Them Thanh Vien</Form.Label>
                        <Form.Control type="text" placeholder="Nhap ten nhom " onChange={(e) => handleSearch(e.target.value)} />
                    </Form.Group>
                    {searchResult.length > 0 ? (
                        <Card className="dataResult">
                            {searchResult.slice(0, 15).map((u) => (
                                <button key={u._id} onClick={(e) => {
                                    addToGroup(e, u)
                                }} >
                                    {u.username}
                                </button>
                            ))}
                        </Card>
                    ) : ""}
                    <div>
                        Cac thanh vien:
                    </div>
                    <div>
                        {
                            toanBo.length > 0 ? (
                                <div >
                                    {toanBo.map((u) => (
                                        <li key={u._id}  >
                                            {u.username}
                                        </li>
                                    ))}
                                </div>
                            ) : ""
                        }
                    </div>

                    <Button variant="primary" type="submit">
                        Tao nhom
                    </Button>
                </Form>
            </Col>

        </Container >
    );
}

export default CreateGroup