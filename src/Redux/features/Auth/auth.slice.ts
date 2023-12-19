import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthentication {
    email: string | undefined;
    accessToken: string | undefined;
    uid: string | undefined;
}

const initialState: IAuthentication = {
    email: undefined,
    accessToken: undefined,
    uid: undefined,
}

const AuthSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        authenticate: (state, action: PayloadAction<IAuthentication>) => {
            const { accessToken, email, uid } = action.payload
            state.accessToken = accessToken
            state.email = email
            state.uid = uid
            localStorage.setItem('auth', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.accessToken = ""
            state.email = ""
            state.uid = ""
            localStorage.clear()
        }
    }
})

export const {
    // getUser,
    authenticate, logout
} = AuthSlice.actions

export default AuthSlice.reducer;