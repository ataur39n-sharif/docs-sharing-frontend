import { configureStore } from '@reduxjs/toolkit'
import { ApiSlice } from './api/api.slice'
import AuthReducer from "./features/Auth/auth.slice"
import DocsReducer from './features/ManageDocs/manageDocs.slice'

export const store = configureStore({
    reducer: {
        authentication: AuthReducer,
        docs: DocsReducer,
        [ApiSlice.reducerPath]: ApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch