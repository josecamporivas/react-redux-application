import { configureStore } from "@reduxjs/toolkit";
import userReducer from './users/slice'
//permite añadir codigo antes y despues de ejecutar una accion (persistencia de datos o comprobacion)
const persistanceLocalStorageMiddleware = (store:any) => (next:any) => (action:any) => { 
    next(action)

    //guarda en LocalStorage el estado despues de ejecutar la accion
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState())) 
}

export const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch