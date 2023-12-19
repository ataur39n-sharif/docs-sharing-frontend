
import { connectSocket } from "@/Redux/features/Socket/socket.slice";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import ChatComponent from "@/components/chat";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useQuill } from "react-quilljs";

const EditDocument = () => {
    const { socket } = useAppSelector(state => state.socket)
    const id = useAppSelector(state => state.authentication.id)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const { quill, quillRef } = useQuill({
        placeholder: 'Document Body',
    });

    useEffect(() => {
        !socket && dispatch(connectSocket({
            id: id as string,
        }))
    }, [id])
    // console.log(socketState);

    useEffect(() => {
        if (socket) {
            socket.on('response', (response) => {
                console.log(response);
                // alert(response)
                socket.emit('a', 'response received - from a')
            })
            socket.on('b', (response) => {
                console.log(response);
            })

        }
    }, [socket])

    const handleSubmit = async () => {
        try {
            const data = {
                title,
                body: quill?.root.innerHTML
            }
            console.log('body', data);

            socket?.emit('hello', { data, id: socket.id })

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