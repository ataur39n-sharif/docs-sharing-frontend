import { useState } from "react";
import { Button } from "react-bootstrap";

export default function ChatComponent() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    return (
        <div className="bg-light h-100">
            {
                !isChatOpen ? <div className="d-flex justify-content-center align-items-center h-100">
                    <Button variant="outline-success"
                        onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                        Join in chat
                    </Button>
                </div> :
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Button variant="outline-danger"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            Close this chat
                        </Button>
                    </div>
            }
        </div>
    )
}