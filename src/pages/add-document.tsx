import { useAddDocsMutation } from "@/Redux/features/ManageDocs/manageDocs.api";
import { store } from "@/Redux/store";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useQuill } from "react-quilljs";
export default function AddDocument() {
    const [title, setTitle] = useState('')
    const { quill, quillRef } = useQuill({
        placeholder: 'Document Body',
    });
    const router = useRouter()
    const [addDocs, options] = useAddDocsMutation()

    useEffect(() => {
        options.isLoading && toast.loading('Please wait...', {
            id: 'addDocs',
        })
        if (options.isSuccess) {
            toast.success(options.data.message, {
                id: 'addDocs',
            })
            console.log(options.data);

            router.replace('/')
        }

        options.isError && toast.error((options.error as any).data.message, {
            id: 'addDocs',
        })
    }, [options])

    const handleSubmit = async () => {
        try {
            const data = {
                title,
                body: quill?.root.innerHTML
            }
            console.log('body', data);
            addDocs({
                title,
                body: quill?.root.innerHTML as string,
                uid: store.getState().authentication.uid as string,
            })
        } catch (error) {
            console.log((error as Error).message);
            toast.error((error as Error).message, {
                id: 'signin',
            })
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{
            height: "100vh"
        }}>
            <div className="">
                <h1 className="mb-5 text-center">Insert Document</h1>
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
    )
}