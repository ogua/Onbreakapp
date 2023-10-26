import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  roles: null,
  userpermission: null,
  permissions: null,
  menu: null,
  currency: null,
  school: null,
  staffrole: null
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
  setSchool: (state, action) => {
    state.school = action.payload
  },
  setStaffrole: (state, action) => {
    state.staffrole = action.payload
  },
  logout: (state) => {
    state.user = null;
    state.token = null;
    state.roles = null;
    state.userpermission = null;
    state.permissions = null;
    state.staffrole = null;
  },
  },
})

export const {setUser, setToken, setRoles,setStaffrole, setUserpermission, setPermissions, setMenu, setCurrency, logout, setSchool} = userinfoSlice.actions

export const selectuser = (state) => state.userinfo.user
export const selecttoken = (state) => state.userinfo.token
export const selectroles = (state) => state.userinfo.roles
export const selectuserpermission = (state) => state.userinfo.userpermission
export const selectpermissions = (state) => state.userinfo.permissions
export const selectmenu = (state) => state.userinfo.menu
export const selectcurrency = (state) => state.userinfo.currency
export const selectschool = (state) => state.userinfo.school
export const selectstaffrole = (state) => state.userinfo.staffrole

export default userinfoSlice.reducer