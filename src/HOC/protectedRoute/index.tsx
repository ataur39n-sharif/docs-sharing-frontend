import { useAppSelector } from "@/Redux/hook";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
    const publicRoutes = ['/signin', '/signup']
    const privateRoutes = ['/add-document', '/edit-document', '/']
    const authState = useAppSelector(state => state.authentication)
    const router = useRouter()
    useEffect(() => {
        if (privateRoutes.includes(router.pathname)) {
            !authState.accessToken && router.replace('/signin')
        }
        if (authState.accessToken && publicRoutes.includes(router.pathname)) {
            router.replace('/')
        }

    }, [router.pathname, authState.accessToken])
    return (
        <>
            {
                children
            }
        </>
    )
}

export default ProtectedRoute