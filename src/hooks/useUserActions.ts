import { useAppDispatch } from '../hooks/store'
import { addNewUser, deleteUserById } from "../store/users/slice";

export const useUserActions = () => {
    const dispatch = useAppDispatch()

    const removeUser = (id:string) => {
        dispatch(deleteUserById(id))
    }

    const addUser = ({name,email,github} : any) => {
        dispatch(addNewUser({name, email,github}))
    }

    return {addUser, removeUser}
}