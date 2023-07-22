import { configureStore } from "@reduxjs/toolkit";
import userReducer, {rollbackDeleteUser} from './users/slice'
import {toast} from 'sonner'

//permite añadir codigo antes y despues de ejecutar una accion (persistencia de datos o comprobacion)
const persistanceLocalStorageMiddleware = (store:any) => (next:any) => (action:any) => { 
    next(action)

    //guarda en LocalStorage el estado despues de ejecutar la accion
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState())) 
}

const syncWithDatabaseMiddleware = (store:any) => (next:any) => (action:any) => { 
    
    const previousState = store.getState()
    next(action)

    //Sincronizamos con la base de datos despues de ejecutar la action
    //En caso de que la base de datos de error, se hace un rollback ()
    if(action.type === 'users/deleteUserById'){
        const userToRemove = previousState.users.find(user => user.id === action.payload)

        const errorDatabase = Math.random() // simula que la base de datos lanza un error
        if(errorDatabase > 0.5){  //operacion exitosa
            toast.success('Usuario eliminado correctamente')
        }else{    //fallo en la base de datos, hay que hacer rollback
            toast.error('Error elimiando el usuario')
            store.dispatch(rollbackDeleteUser(userToRemove))
        }
    }

}

export const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch