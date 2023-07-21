import { useAppDispatch } from '../hooks/store'
import { deleteUserById } from "../store/users/slice";

export const useUserAcitons = () => {
    const dispatch = useAppDispatch()

    const removeUser = (id:string) => {
        dispatch(deleteUserById(id))
    }

    return {removeUser}
}