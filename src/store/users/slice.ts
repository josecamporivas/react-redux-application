import { createSlice } from '@reduxjs/toolkit'

export interface User{
    name:string;
    email:string;
    github:string;
}

export interface UserWithId extends User{
    id:string;
}

const initialState: UserWithId[] = [
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

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUserById: (state, action) => {
            const id = action.payload
            return state.filter(user => user.id !== id)
        }
    }
})

export default usersSlice.reducer

export const {deleteUserById} = usersSlice.actions