import { createSlice } from '@reduxjs/toolkit'
import { tokenname } from '../components/constants'


const initialState = {
  user: null,
  token: null,
}

export const usertokenSlice = createSlice({
  name: 'usertoken',
  initialState,
  reducers: {
    setUsertoken: async (state, action) => {
      await AsyncStorage.setItem("token", action.payload)
    }
  },
})

export const { setUsertoken} = usertokenSlice.actions

export const gettokendata = async () => {
  try {
    const value = await AsyncStorage.getItem("token")
    if(value !== null) {
      return value
    }
  } catch(e) {
      console.log('something went wrong')
  }
}






export const selectusertoken = (state) => state.usertoken.usertoken

export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(tokenname, value)
    } catch (e) {
      console.log('something went wrong')
    }
}

export const storeDataobject = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(tokenname, jsonValue)
    } catch (e) {
        console.log('something went wrong')
    }
}

export const getDataobject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(tokenname)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log('something went wrong')
    }
}


export const removeusertoken = async () => {
    try {
      await AsyncStorage.removeItem(tokenname)
    } catch(e) {
        console.log('something went wrong')
    }
  
    console.log('Done.')
}

export default usertokenSlice.reducer