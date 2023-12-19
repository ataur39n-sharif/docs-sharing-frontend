import { createSlice } from "@reduxjs/toolkit";

export interface IDocs {
    _id?: string
    uid: string
    title: string
    body: string
    createdAt?: Date
    updatedAt?: Date
}

type TInitialState = {
    allDocs: IDocs[]
}

const initialState: TInitialState = {
    allDocs: []
}

const DocsSlice = createSlice({
    name: "Docs",
    initialState,
    reducers: {
    }
})

export const {
} = DocsSlice.actions

export default DocsSlice.reducer;