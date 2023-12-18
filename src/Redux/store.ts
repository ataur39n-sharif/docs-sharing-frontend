import { configureStore } from '@reduxjs/toolkit'
import { ApiSlice } from './api/api.slice'
import AuthReducer from "./features/Auth/auth.slice"

export const store = configureStore({
    reducer: {
        authentication: AuthReducer,
        [ApiSlice.reducerPath]: ApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch