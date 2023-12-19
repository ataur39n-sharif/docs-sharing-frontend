
import { useEditDocsMutation, useLazyGetSingleDocQuery } from "@/Redux/features/ManageDocs/manageDocs.api";
import { connectSocket, manageTypingStatus, updateLogs } from "@/Redux/features/Socket/socket.slice";
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
    const { uid, name: { firstName } } = useAppSelector(state => state.authentication)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const { quill, quillRef } = useQuill();

    const [draft, setDraft] = useState({
        title: '',
        body: ''
    })
    const [changed, setChanged] = useState(false)

    const router = useRouter()
    const [fetchSingle, { isError, isSuccess, data, isLoading, error }] = useLazyGetSingleDocQuery()
    // const { isError, isSuccess, data, isLoading, error } = useGetSingleDocQuery(router.query.id as string)
    const [updateDocs, options] = useEditDocsMutation()

    useEffect(() => {
        router && fetchSingle(router.query.id as string)
    }, [router])

    useEffect(() => {
        //initialize socket connection
        uid && router && dispatch(connectSocket({
            uid: uid as string,
            name: firstName as string,
            roomNumber: router.query.id as string
        }))
    }, [uid, firstName, router])

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', {
                name: firstName,
                roomNumber: router.query.id
            });
            socket.on('userJoined', (data) => {
                dispatch(updateLogs(data))
            });
            socket.on('message', (data) => {
                console.log('message listener', data);
                dispatch(updateLogs(data))
            })
            socket.on('update-docs-notify', (data) => {
                console.log('message listener', data);
                dispatch(updateLogs(data))
                fetchSingle(router.query.id as string)
            })
            socket.on('typing-notify', (data) => {
                console.log({ data });
                dispatch(manageTypingStatus(data))
            })
        }
    }, [socket, router])

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
        socket?.emit('typing', router.query.id, {
            type: 'add',
            firstName: firstName as string,
            uid: uid as string,
        })
        // dispatch(manageTypingStatus({
        //     type: 'add',
        //     firstName: firstName as string,
        //     uid: uid as string,
        // }))
        name === 'title' && setTitle(value as string)
    }

    const stopChanging = () => {
        socket?.emit('typing', router.query.id, {
            type: 'remove',
            firstName: firstName as string,
            uid: uid as string,
        })
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
            socket?.emit('update-docs', router.query.id, firstName)
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
                            <Form.Control type="text"
                                placeholder="Document title"
                                name="title" value={title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                onKeyUp={() => stopChanging()}
                            />
                        </FloatingLabel>
                        <div className="mb-3" ref={quillRef}
                            onKeyDown={() => handleChange('body')}
                            onKeyUp={() => stopChanging()}
                            style={{
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
            <Col style={{
                maxHeight: "90vh"
            }}>
                <ChatComponent id={router.query.id as string} />
            </Col>
        </Row>
    )
}

export default EditDocument