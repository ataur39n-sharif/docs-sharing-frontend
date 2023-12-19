import { useSignUpMutation } from "@/Redux/features/Auth/auth.api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";

const SignUp = () => {
    const [info, setInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [signup, options] = useSignUpMutation()

    const router = useRouter()

    useEffect(() => {
        options.isLoading && toast.loading('Please wait...', {
            id: 'signup',
        })
        if (options.isSuccess) {
            toast.success(options.data.message, {
                id: 'signup',
            })
            router.replace('/signin')
        }

        options.isError && toast.error((options.error as any).data.message, {
            id: 'signup',
        })
    }, [options])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            signup({
                name: {
                    firstName: info.firstName,
                    lastName: info.lastName
                },
                email: info.email,
                password: info.password
            })
        } catch (error) {
            toast.error((error as Error).message, {
                id: 'signup',
            })
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{
            height: '100vh'
        }}>
            <div className="w-50">
                <h1 className="mb-5 text-center">Sign up</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="First Name"
                                className="mb-3"
                            >
                                <Form.Control onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} type="text" placeholder="Alex" name="firstName" required />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Last Name"
                                className="mb-3"
                            >
                                <Form.Control onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} type="text" placeholder="Devin" name="lastName" required />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} type="email" placeholder="name@example.com" name="email" required />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} type="password" placeholder="Password" name="password" required />
                    </FloatingLabel>
                    <div className="m-3">
                        <Link href={'/signin'} className="">
                            Already have a account ? Login here.
                        </Link>
                    </div>
                    <div className="p-3" >
                        <Button type="submit" size="lg" variant="outline-dark">Sign up</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp