import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  roles: null,
  userpermission: null,
  permissions: null,
  menu: null,
  currency: null
}

export const userinfoSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
        state.token = action.payload
    },
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    setUserpermission: (state, action) => {
        state.userpermission = action.payload
    },
    setPermissions: (state, action) => {
        state.permissions = action.payload
    },
    setMenu: (state, action) => {
        state.menu = action.payload
    },
    setCurrency: (state, action) => {
      state.currency = action.payload
  },
  },
})

export const { setUser, setToken, setRoles,  setUserpermission, setPermissions, setMenu, setCurrency} = userinfoSlice.actions

export const selectuser = (state) => state.userinfo.user
export const selecttoken = (state) => state.userinfo.token
export const selectroles = (state) => state.userinfo.roles
export const selectuserpermission = (state) => state.userinfo.userpermission
export const selectpermissions = (state) => state.userinfo.permissions
export const selectmenu = (state) => state.userinfo.menu
export const selectcurrency = (state) => state.userinfo.currency

export default userinfoSlice.reducer