import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import userinfoReducer from './features/userinfoSlice'
import usertokenReducer from './features/usertokenSlice'


const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, userinfoReducer)


export default store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk]
// })

export const persistor = persistStore(store)


// for combine combineReducers

// const rootReducer = combineReducers({ 
//   user: userReducer,
//   notes: NotesReducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//   reducer: persistedReducer
// })