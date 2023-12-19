import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthentication {
    name: {
        firstName: string | undefined;
        lastName: string | undefined
    };
    email: string | undefined;
    accessToken: string | undefined;
    uid: string | undefined;
}

const initialState: IAuthentication = {
    name: {
        firstName: undefined,
        lastName: undefined,
    },
    email: undefined,
    accessToken: undefined,
    uid: undefined,
}

const AuthSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        authenticate: (state, action: PayloadAction<IAuthentication>) => {
            const { accessToken, email, uid, name } = action.payload
            state.accessToken = accessToken
            state.email = email
            state.uid = uid
            state.name = name
            localStorage.setItem('auth', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.accessToken = undefined
            state.email = undefined
            state.uid = undefined
            state.name = {
                firstName: undefined,
                lastName: undefined
            }
            localStorage.clear()
        }
    }
})

export const {
    // getUser,
    authenticate, logout
} = AuthSlice.actions

export default AuthSlice.reducer;