import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthentication {
    name: {
        firstName: string | null;
        lastName: string | null
    };
    email: string | null;
    accessToken: string | null;
    uid: string | null;
}

const initialState: IAuthentication = {
    name: {
        firstName: null,
        lastName: null,
    },
    email: null,
    accessToken: null,
    uid: null,
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
            state.accessToken = null
            state.email = null
            state.uid = null
            state.name = {
                firstName: null,
                lastName: null
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