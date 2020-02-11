// Library import
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

// CSS import
import './scss/index.scss'

// Component import
import App from './App'

// Services import
import * as serviceWorker from './serviceWorker'

// Reducers Import
import reducers from './api/reducers'

// Middlewares import
import { applyMiddleware, compose, createStore } from 'redux'

//Sagas import
import rootSaga from './api/sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware(sagaMiddleware)))
const bowserHistory = createBrowserHistory()

sagaMiddleware.run(rootSaga)

ReactDOM.render((
  <Provider store={store}>
    <Router history={bowserHistory}>
      <App url={bowserHistory}/>
    </Router>
  </Provider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
