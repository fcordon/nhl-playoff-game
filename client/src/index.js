// Library import
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

// CSS import
import './scss/index.scss'

// Component import
import App from './App'

// Services import
import * as serviceWorker from './serviceWorker'

const bowserHistory = createBrowserHistory()

ReactDOM.render((
  <Router history={bowserHistory}>
    <App url={bowserHistory}/>
  </Router>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
