
import ChatComponent from "@/components/chat";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useQuill } from "react-quilljs";
import { io } from "socket.io-client";

const EditDocument = () => {
    const [socketInfo, setSocketInfo] = useState()
    const [title, setTitle] = useState('')
    const { quill, quillRef } = useQuill({
        placeholder: 'Document Body',
    });

    useEffect(() => {
        const socket = io('http://localhost:5000')
        // socket.emit('connection', 'hello world')
        console.log(socket);

    }, [])

    // type: "alert" | "message"
    /* 

    [
        {
            type: "alert",
            details: ""
        },
        {
            type: "message",
            details:""
        }
    ]
    
    */



    const handleSubmit = async () => {
        try {
            const data = {
                title,
                body: quill?.root.innerHTML
            }
            console.log('body', data);
        } catch (error) {
            console.log((error as Error).message);
        }
    }


    return (
        <Row>
            <Col>
                <div className="container d-flex justify-content-center align-items-center" style={{
                    height: "100vh"
                }}>
                    <div className="">
                        <h1 className="mb-5 text-center">Edit Document</h1>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Document Title"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Document title" name="title" onChange={(e) => setTitle(e.target.value)} />
                        </FloatingLabel>
                        <div className="mb-3" ref={quillRef} style={{
                            height: '30vh',
                            minHeight: "30vh",
                            maxWidth: "40vw"
                        }} />
                        <Button onClick={() => handleSubmit()} variant="outline-dark">Submit</Button>
                    </div>
                </div>
            </Col>
            <Col>
                <ChatComponent />
            </Col>
        </Row>
    )
}

export default EditDocument