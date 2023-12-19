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
                // newSocket.emit('hello', newSocket)
                newSocket.on('connection', () => {
                })

                console.log(newSocket);
                state.socket = newSocket as any
            }
        },
    }
})

export const {
    connectSocket
} = SocketSlice.actions

export default SocketSlice.reducer;