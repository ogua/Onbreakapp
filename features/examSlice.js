import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { schoolzapi } from '../components/constants';

//const token = useSelector(selecttoken);

const initialState = {
  exam: null,
  origin: null,
  orgaddress: null,
  heading: null,
  destination: null,
  desaddress: null,
  tranemail: "yormail@mail.com",
}

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setExam: (state,action) => {
      state.exam = action.payload
    },
    setOrigin: (state, action) => {
      state.origin = action.payload
    },
    updateroute: (state, action) => {
      axios.get(schoolzapi+'/routes',
      {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+action.payload.token
      }})
          .then(function (response) {
            console.log("routes",response.data.data);
          })
          .catch(function (error) {
           console.log("error",error.response);
     });
    },
    setOrgaddress: (state, action) => {
      state.orgaddress = action.payload
    },
    setHeading: (state, action) => {
      state.heading = action.payload
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setdesAdrress: (state, action) => {
      state.desaddress = action.payload
    },
    setTranemail: (state, action) => {
      state.tranemail = action.payload
    },
    
  },
})

export const {updateroute, setTranemail,setHeading, setOrigin, setOrgaddress, setDestination, setdesAdrress,setExam} = examSlice.actions

export const selectexam = (state) => state.exam.exam
export const seleteorigin = (state) => state.exam.origin
export const selectorgaddress = (state) => state.exam.orgaddress
export const selectheading = (state) => state.exam.heading
export const selectdestination = (state) => state.exam.destination
export const selectdesaddress = (state) => state.exam.desaddress
export const selecttranemail = (state) => state.exam.tranemail


export default examSlice.reducer