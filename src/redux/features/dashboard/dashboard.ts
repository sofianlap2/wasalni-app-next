import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../Store'

export interface dashboardState {
  usersList: Array<any>,
  price: number,
  adress: string
}

const initialState: dashboardState = {
    usersList: [],
    price: 1,
    adress: ''
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getUsers: (state, action : PayloadAction<any>) => {
      state.usersList = action.payload
    },
    addUser: (state, action : PayloadAction<any>) => {
      state.usersList.push(action.payload)
    },
    getPrice: (state, action : PayloadAction<any>) => {
      state.price = action.payload
    },
    getAdress: (state, action : PayloadAction<any>) => {
      state.adress = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { getUsers, addUser, getPrice, getAdress } = dashboardSlice.actions

export const usersList = (state: RootState) => state.dashboardReducer.usersList;

export default dashboardSlice.reducer