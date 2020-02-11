import { put, takeLatest, all, call } from 'redux-saga/effects'
import request from '../utils/request'

import {
  GET_NHL_TEAMS,
  API_GET_TEAMS,
} from './constants'

import {
  getNhlTeamsSuccessAction,
  getNhlTeamsErrorAction,
} from './actions'

export function* getNhlTeams() {
  const teamsRequestUrl = API_GET_TEAMS

  const requestOptions = {
    method: 'GET',
    mode: 'no-cors'
  }

  try {
    const requestResponse = yield call(request, teamsRequestUrl, requestOptions)

    if (requestResponse.status === 'error') {
      yield put(getNhlTeamsErrorAction(requestResponse.message));
    } else {
      yield put(getNhlTeamsSuccessAction(requestResponse.data.teams));
    }
  } catch (error) {
    yield put(getNhlTeamsErrorAction(error));
  }
}

function* watchIncrementAsync() {
  yield takeLatest(GET_NHL_TEAMS, getNhlTeams)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync()
  ])
}