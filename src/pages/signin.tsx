import Link from "next/link"
import { Button, FloatingLabel, Form } from "react-bootstrap"

const Signin = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{
            height: '100vh'
        }}>
            <div className="w-50">
                <h1 className="mb-5 text-center">Login</h1>
                <div >
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <div className="m-3">
                        <Link href={'/signup'} className="">
                           No account ? Sign up here.
                        </Link>
                    </div>
                    <div className="p-3" >
                        <Button size="lg" variant="outline-dark">Sign in</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin