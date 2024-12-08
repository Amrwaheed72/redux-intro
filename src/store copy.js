import { applyMiddleware, combineReducers, createStore } from 'redux'
import accountReducer from './features/accounts/accountSlice'
import customerReducer from './features/customers/customerSlice'
import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store