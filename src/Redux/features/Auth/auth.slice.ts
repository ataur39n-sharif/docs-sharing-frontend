import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAuthentication {
    email: string | undefined;
    accessToken: string | undefined;
    id: string | undefined;
}

const initialState: IAuthentication = {
    email: undefined,
    accessToken: undefined,
    id: undefined,
}

const AuthSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        authenticate: (state, action: PayloadAction<IAuthentication>) => {
            state.accessToken = action.payload.accessToken
            state.email = action.payload.email
            state.id = action.payload.id
            localStorage.setItem('auth', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.accessToken = ""
            state.email = ""
            localStorage.clear()
        }
    }
})

export const {
    // getUser,
    authenticate, logout
} = AuthSlice.actions

export default AuthSlice.reducer;