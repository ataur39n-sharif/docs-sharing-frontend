import { authenticate } from "@/Redux/features/Auth/auth.slice";
import { useAppDispatch } from "@/Redux/hook";
import { ReactNode, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

export default function PreInitApp({ children }: IProps) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const auth = localStorage.getItem('auth')
        // //console.log({auth});

        if (auth) {
            // //console.log('inside auth');

            const { accessToken, email, uid, name } = JSON.parse(auth)
            dispatch(authenticate({
                accessToken,
                email,
                uid,
                name
            }))
        }
    }, [])
    return children
}