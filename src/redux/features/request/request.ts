import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Store'
import { requestInfoState } from "../../../../interfaces/index"

export interface requestState {
  requestInfo: requestInfoState,
  allRequests: {}[]
}

const initialState: requestState = {
  requestInfo: {
    _id: '',
    acceptebby: '',
    date: '',
    from: '',
    priceTag: 0,
    road: '',
    status: '',
    time: '',
    to: '',
    user_id: ''
  },
  allRequests: []
}

export const requestSlice = createSlice({
  name: 'request-info',
  initialState,
  reducers: {
    registerRoad: (state, action: PayloadAction<any>) => {
      state.requestInfo.road = action.payload
    },
    registerRequestInfo: (state, action: PayloadAction<any>) => {
      state.requestInfo = action.payload
    },
    getallRequests: (state, action: PayloadAction<any>) => {
      state.allRequests = action.payload
    },
    acceptRequest: (state, action: PayloadAction<any>) => {
      state.requestInfo.status = 'Ongoing',
        state.requestInfo.acceptebby = action.payload
    },
    cancelRequest: (state) => {
      state.requestInfo.status = 'Pending',
        state.requestInfo.acceptebby = ''
    },
  }
})

// Action creators are generated for each case reducer function
export const { registerRoad, registerRequestInfo, acceptRequest, cancelRequest, getallRequests } = requestSlice.actions

export const requestInfo = (state: RootState) => state.requestReducer.requestInfo
export const allRequests = (state: RootState) => state.requestReducer.allRequests

export default requestSlice.reducer