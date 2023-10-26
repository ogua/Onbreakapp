import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import userinfoReducer from './features/userinfoSlice'
import usertokenReducer from './features/usertokenSlice'


export default configureStore({
  reducer: {
    userinfo : userinfoReducer
  },
})