import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth'
import dashboardReducer from './features/dashboard/dashboard'
import requestReducer from './features/request/request'

const rootReducer = combineReducers({
    authReducer,
    dashboardReducer,
    requestReducer
})

export default rootReducer