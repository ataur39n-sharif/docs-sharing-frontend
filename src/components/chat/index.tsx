import { sendMessage } from "@/Redux/features/Socket/socket.slice";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function ChatComponent() {
    const socketState = useAppSelector(state => state.socketState)
    const authState = useAppSelector(state => state.authentication)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const dispatch = useAppDispatch()

    const [msg, setMsg] = useState('')

    console.log(socketState?.logs);

    const handleSubmit = () => {
        console.log(authState);

        dispatch(sendMessage({
            message: msg,
            firstName: authState?.name.firstName as string,
        }))
        setMsg('')
    }

    return (
        <div className="bg-light h-100 container ">
            <div className="position-relative h-100">
                <div className="overflow-auto p-5" style={{
                    height: "70vh",
                    maxHeight: "70vh"
                }}>
                    {
                        socketState?.logs && socketState?.logs.map((log) => <p><strong>{log.sender} : </strong>{log.message}</p>)
                    }
                </div>
                <Row className="position-absolute w-100 d-flex justify-content-center align-items-center" style={{
                    maxHeight: '300px',
                    bottom: '10%'
                }}>
                    <Col xs={12} md={10}>
                        <FloatingLabel controlId="floatingTextarea2" label="Write your message">
                            <Form.Control
                                as="textarea"
                                placeholder="type your message"
                                style={{ height: '100px', maxHeight: '200px' }}
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col className="text-center mt-2">
                        <Button onClick={() => handleSubmit()}>send message</Button>
                    </Col>
                </Row>
            </div>



        </div>
    )
}

/* 

 {
                !isChatOpen ?
                    <div className="h-100">
                        <ul>
                            {
                                socketState?.logs?.map(log => <li>{log.sender} - {log.message}</li>)
                            }
                        </ul>

                        {/* <div className="d-flex justify-content-center align-items-center h-100">
                        <div>

                        </div>
                        <Button variant="outline-success"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            Join in chat
                        </Button>
                //         </div>
                //         </div> :
                //         <div className="d-flex justify-content-center align-items-center h-100">
                //             <Button variant="outline-danger"
                //                 onClick={() => setIsChatOpen(!isChatOpen)}
                //             >
                //                 Close this chat
                //             </Button>
                //         </div>
                // }

*/