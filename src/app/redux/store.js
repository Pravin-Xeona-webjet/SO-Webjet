import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import logger from 'redux/middleware'
import counterReducer from 'redux/counter/slice'

const reducer = combineReducers({
  counter: counterReducer
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger]
})
