import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useQuill } from "react-quilljs";

const TextEditor = () => {
    const [title, setTitle] = useState('')
    const { quill, quillRef } = useQuill({
        placeholder: 'Document Body',
    });


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

export default TextEditor