import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

type TLog = {
    type: "alert" | "message",
    sender: string | null,
    receiver: string | null,
    message: string
}

type TInitialState = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null,
    logs: TLog[]
}

const initialState: TInitialState = {
    socket: null,
    logs: []
}

const SocketSlice = createSlice({
    name: "Socket",
    initialState,
    reducers: {
        connectSocket: (state, action: PayloadAction<{ id: string }>) => {
            if (!state.socket) {
                const newSocket = io('http://localhost:5000', {
                    query: {
                        id: action.payload.id
                    }
                })
                newSocket.on('connection', () => {
                })
                state.socket = newSocket as any
            }
        },
        updateLogs: (state, action: PayloadAction<TLog>) => {
            console.log(action.payload);

            state.logs.push(action.payload)
        }
    }
})

export const {
    connectSocket, updateLogs
} = SocketSlice.actions

export default SocketSlice.reducer;