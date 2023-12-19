import { logout } from "@/Redux/features/Auth/auth.slice"
import { useAppDispatch, useAppSelector } from "@/Redux/hook"
import { useRouter } from "next/router"
import { Button, Container, Navbar } from "react-bootstrap"

const NavbarComponent = () => {

    const authState = useAppSelector(state => state.authentication)
    const dispatch = useAppDispatch()
    const router = useRouter()

    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Smart Docs </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {
                            authState.accessToken ?
                                <>
                                    <Navbar.Text>
                                        Signed in as: <a href="#login">{authState?.name?.firstName}</a>
                                    </Navbar.Text>
                                    <Button onClick={() => dispatch(logout())} className="ms-3" variant="danger">Logout</Button>
                                </>
                                :
                                <Button onClick={() => router.replace('/signin')} className="ms-3" variant="danger">Sign In</Button>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent