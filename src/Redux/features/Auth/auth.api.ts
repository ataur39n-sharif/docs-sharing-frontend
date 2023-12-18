import { ApiSlice } from "../../api/api.slice"


interface ILogin {
    email: string,
    password: string
}

interface IRegister extends ILogin {
    name: {
        firstName: string
        lastName: string
    }
}

const AuthApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data: IRegister) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data: ILogin) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useLoginMutation,
    useSignUpMutation
} = AuthApiSlice