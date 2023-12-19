import { useLoginMutation } from "@/Redux/features/Auth/auth.api"
import { authenticate } from "@/Redux/features/Auth/auth.slice"
import { useAppDispatch } from "@/Redux/hook"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import toast from "react-hot-toast"

const Signin = () => {
    const [info, setInfo] = useState({
        email: "",
        password: "",
    })
    const [signin, options] = useLoginMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        options.isLoading && toast.loading('Please wait...', {
            id: 'signin',
        })
        if (options.isSuccess) {
            toast.success(options.data.message, {
                id: 'signin',
            })
            dispatch(authenticate(options.data.data))
            console.log(options.data);

            // router.replace('/')
        }

        options.isError && toast.error((options.error as any).data.message, {
            id: 'signin',
        })
    }, [options])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            signin(info)
        } catch (error) {
            toast.error((error as Error).message, {
                id: 'signin',
            })
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{
            height: '100vh'
        }}>
            <div className="w-50">
                <h1 className="mb-5 text-center">Login</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} name="email" type="email" placeholder="name@example.com" required />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} name="password" type="password" placeholder="Password" required />
                    </FloatingLabel>
                    <div className="m-3">
                        <Link href={'/signup'} className="">
                            No account ? Sign up here.
                        </Link>
                    </div>
                    <div className="p-3" >
                        <Button type="submit" size="lg" variant="outline-dark">Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin