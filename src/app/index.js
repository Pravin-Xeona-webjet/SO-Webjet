import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import store from 'redux/store'
import App from './App'
import './styles/index.less'

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// Log the initial state
// console.log(store.getState())
// const unsubscribe = store.subscribe(() => console.log(store.getState()))
// store.dispatch(IncreaseCount(1))
// unsubscribe()
