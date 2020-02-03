// Library import
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import history from './utils/history'

// CSS import
import './scss/index.scss'

// Component import
import App from './App'

// Services import
import * as serviceWorker from './serviceWorker'

const initialState = {};
const store = configureStore(initialState, history)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App url={history}/>
    </Router>
  </Provider>
), document.getElementById('root'))

export default store

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
