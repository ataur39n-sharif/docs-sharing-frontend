
import { useGetSingleDocQuery } from "@/Redux/features/ManageDocs/manageDocs.api";
import { connectSocket, updateLogs } from "@/Redux/features/Socket/socket.slice";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import ChatComponent from "@/components/chat";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useQuill } from "react-quilljs";

const EditDocument = () => {
    const { socket } = useAppSelector(state => state.socketState)
    const id = useAppSelector(state => state.authentication.uid)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const { quill, quillRef } = useQuill({
        placeholder: 'Document Body',
    });

    const router = useRouter()
    const { isError, isSuccess, data, isLoading, error } = useGetSingleDocQuery(router.query.id as string)

    useEffect(() => {
        //initialize socket connection
        !socket && dispatch(connectSocket({
            id: id as string,
        }))
    }, [id])

    useEffect(() => {
        if (socket) {
            socket.on('joined-to-edit', (data) => {
                console.log('joined to edit', data);

                dispatch(updateLogs(data))
            })
        }
    }, [socket])

    useEffect(() => {
        isLoading && toast.loading('Please wait...', {
            id: 'fetchSingle',
        })
        if (isSuccess) {
            toast.success(data.message, {
                id: 'fetchSingle',
            })
            // dispatch(authenticate(data.data))
            console.log(data);

            // router.replace('/')
        }

        isError && toast.error((error as any).data.message, {
            id: 'fetchSingle',
        })
    }, [isError, isSuccess, data, isLoading, error])

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
        <Row className="w-100">
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