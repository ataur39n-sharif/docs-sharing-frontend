import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

type TLog = {
    type: "alert" | "message",
    sender: string | null,
    receiver: string | null,
    message: string,
}

type TInitialState = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null,
    logs: TLog[],
    typing: {
        uid: string,
        firstName: string,
    }[]
}

const initialState: TInitialState = {
    socket: null,
    logs: [],
    typing: []
}

const SocketSlice = createSlice({
    name: "SocketSlice",
    initialState,
    reducers: {
        connectSocket: (state, action: PayloadAction<{ uid: string, name: string, roomNumber: string }>) => {
            if (!state.socket) {
                // https://docs-sharing-api.trelyt.store
                // http://localhost:5000
                const newSocket = io('https://docs-sharing-api.trelyt.store', {
                    query: {
                        uid: action.payload.uid,
                        name: action.payload.name,
                        roomNumber: action.payload.roomNumber
                    }
                })
                newSocket.on('connection', () => {
                })
                // newSocket.emit('joinRoom', {
                //     name: action.payload.name,
                //     roomNumber: action.payload.roomNumber
                // });
                state.socket = newSocket as any
            }
        },
        sendMessage: (state, action: PayloadAction<{ message: string, firstName: string, roomNumber: string }>) => {
            const data: TLog = {
                message: action.payload.message,
                sender: action.payload.firstName,
                receiver: 'server',
                type: 'message'
            }
            console.log('send message', {
                roomNumber: action.payload.roomNumber,
                data
            });

            state.socket?.emit('sendMessage', {
                roomNumber: action.payload.roomNumber,
                data
            })
            // state.logs.push(data)
        },
        updateLogs: (state, action: PayloadAction<TLog>) => {
            console.log(action.payload);
            state.logs.push(action.payload)
        },
        manageTypingStatus: (state, action: PayloadAction<{
            type: 'add' | 'remove',
            firstName: string,
            uid: string
        }>) => {
            if (action.payload.type === 'add') {
                const alreadyListed = state.typing.find((user) => user.uid === action.payload.uid)
                !alreadyListed && state.typing.push({
                    firstName: action.payload.firstName,
                    uid: action.payload.uid
                })
            }
            if (action.payload.type === 'remove') {
                state.typing = state.typing.filter((user) => user.uid !== action.payload.uid)
            }
        }
    }
})

export const {
    connectSocket, sendMessage, updateLogs, manageTypingStatus
} = SocketSlice.actions

export default SocketSlice.reducer;