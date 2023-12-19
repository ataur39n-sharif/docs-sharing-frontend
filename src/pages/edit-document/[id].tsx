
import { useEditDocsMutation, useGetSingleDocQuery } from "@/Redux/features/ManageDocs/manageDocs.api";
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
    const { quill, quillRef } = useQuill();

    const [draft, setDraft] = useState({
        title: '',
        body: ''
    })
    const [changed, setChanged] = useState(false)

    const router = useRouter()
    const { isError, isSuccess, data, isLoading, error } = useGetSingleDocQuery(router.query.id as string)
    const [updateDocs, options] = useEditDocsMutation()

    useEffect(() => {
        //initialize socket connection
        !socket && dispatch(connectSocket({
            id: id as string,
        }))
    }, [id])

    useEffect(() => {
        if (socket) {
            socket.on('joined-to-edit', (data) => {
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
            console.log(data);
            if (data.data) {
                setTitle(data.data.title)
                quill?.clipboard.dangerouslyPasteHTML(data.data.body)
            }
        }

        isError && toast.error((error as any).data.message, {
            id: 'fetchSingle',
        })
    }, [isError, isSuccess, data, isLoading, error])

    useEffect(() => {
        options.isLoading && toast.loading('Please wait...', {
            id: 'updateDocs',
        })
        if (options.isSuccess) {
            toast.success(options.data.message, {
                id: 'updateDocs',
            })
        }

        options.isError && toast.error((options.error as any).data.message, {
            id: 'updateDocs',
        })
    }, [options])

    const handleChange = (name: string, value?: string) => {
        setChanged(true)
        name === 'title' && setTitle(value as string)
    }

    const handleSubmit = async () => {
        try {
            const data = {
                title,
                body: quill?.root.innerHTML
            }
            console.log('body', data);
            updateDocs({
                id: router.query.id as string,
                data
            })
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    const handleReset = () => {
        quill?.clipboard.dangerouslyPasteHTML(data.data.body)
        setTitle(data.data.title)
        setChanged(false)
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
                            <Form.Control type="text" placeholder="Document title" name="title" value={title} onChange={(e) => handleChange('title', e.target.value)} />
                        </FloatingLabel>
                        <div className="mb-3" ref={quillRef} onKeyDown={() => handleChange('body')} style={{
                            height: '30vh',
                            minHeight: "30vh",
                            maxWidth: "40vw"
                        }} />
                        <Button onClick={() => handleSubmit()} variant="outline-danger">Update</Button>
                        {
                            changed && <Button onClick={() => handleReset()} className="ms-2" variant="outline-warning">Reset</Button>
                        }
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