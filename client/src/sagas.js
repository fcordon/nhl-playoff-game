import { put, takeLatest, all, call } from 'redux-saga/effects'
import request from './utils/request'

import {
  GET_NHL_TEAMS,
} from './constants';

import {
  getNhlTeamsSuccessAction,
  getNhlTeamsErrorAction,
} from './actions/Actions';

function* getNhlTeamsReq() {
  const requestURL = 'https://statsapi.web.nhl.com/api/v1/teams'

  // make headers
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  // make request options
  const requestOptions = {
    method: 'GET',
    mode: 'no-cors',
    headers,
  }
  
  try {
    const nhlTeamsResponse = yield call(request, requestURL, requestOptions)

    if (nhlTeamsResponse.status === 'error') {
      yield put(getNhlTeamsErrorAction(nhlTeamsResponse.message))
    } else {
      yield put(getNhlTeamsSuccessAction(nhlTeamsResponse))
    }
  } catch (err) {
    yield put(getNhlTeamsErrorAction(err))
  }
}

function* watchActions() {
  yield takeLatest(GET_NHL_TEAMS, getNhlTeamsReq)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchActions()
  ])
}