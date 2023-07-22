import { createSlice } from '@reduxjs/toolkit'

export interface User{
    name:string;
    email:string;
    github:string;
}

export interface UserWithId extends User{
    id:string;
}

const DEFAULT_STATE: UserWithId[] = [
    {
        id:"1",
        name: "Peter Doe",
        email: "peter@peter.com",
        github: "peterElPro"
    },
    {
        id:"2",
        name: "Jose Doe",
        email: "jose@jose.com",
        github: "joseElNoob"
    },
    {
        id:"3",
        name: "Antonio",
        email: "tonio@an.com",
        github: "anatolly"
    },
    {
        id:"4",
        name: "Carlos",
        email: "elde@los.com",
        github: "protip"
    }
]

const initialState: UserWithId[] = (() => {
    const persistedStore = localStorage.getItem("__redux__state__")
    if(persistedStore){
        return JSON.parse(persistedStore).users
    }

    return DEFAULT_STATE
})()

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUserById: (state, action) => {
            const id = action.payload
            return state.filter(user => user.id !== id)
        },
        addNewUser: (state, action) => {
            const id = crypto.randomUUID()
            return [...state, {id, ...action.payload}]
        },
        }
    }
})

export default usersSlice.reducer

export const {addNewUser, deleteUserById, rollbackDeleteUser} = usersSlice.actions