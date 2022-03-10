import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../Store'

export interface userState {
  userInfo: any,
  isLoggedIn: boolean,
}

const initialState: userState = {
  userInfo: {},
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'user-info',
  initialState,
  reducers: {
    userLogin: (state, action : PayloadAction<any>) => {
      state.userInfo = action.payload,
      state.isLoggedIn = true
    },
    userLogout: (state) => {
      state.userInfo = {},
        state.isLoggedIn = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = authSlice.actions

export const userInfo = (state: RootState) => state.authReducer.userInfo
export const isLoggedIn = (state: RootState) => state.authReducer.isLoggedIn

export default authSlice.reducer