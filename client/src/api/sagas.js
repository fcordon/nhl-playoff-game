import { put, takeLatest, all, call } from 'redux-saga/effects'
import request from '../utils/request'

import {
  GET_NHL_TEAMS,
  GET_STANDINGS,
  API_BASE_URL,
  API_GET_TEAMS,
  API_GET_STANDINGS,
} from './constants'

import {
  getNhlTeamsSuccessAction,
  getNhlTeamsErrorAction,
  getStandingsSuccessAction,
  getStandingsErrorAction,
} from './actions'

const requestOptionsGet = {
  method: 'GET',
  mode: 'no-cors'
}

export function* getNhlTeams() {
  const teamsRequestUrl = API_BASE_URL + API_GET_TEAMS

  try {
    const requestResponse = yield call(request, teamsRequestUrl, requestOptionsGet)

    if (requestResponse.status === 'error') {
      yield put(getNhlTeamsErrorAction(requestResponse.message));
    } else {
      yield put(getNhlTeamsSuccessAction(requestResponse.data.teams));
    }
  } catch (error) {
    yield put(getNhlTeamsErrorAction(error));
  }
}

export function* getStandings() {
  const teamsRequestUrl = API_BASE_URL + API_GET_STANDINGS

  try {
    const requestResponse = yield call(request, teamsRequestUrl, requestOptionsGet)

    if (requestResponse.status === 'error') {
      yield put(getStandingsErrorAction(requestResponse.message));
    } else {
      yield put(getStandingsSuccessAction(requestResponse.data.records));
    }
  } catch (error) {
    yield put(getStandingsErrorAction(error));
  }
}

function* watchIncrementAsync() {
  yield takeLatest(GET_NHL_TEAMS, getNhlTeams)
  yield takeLatest(GET_STANDINGS, getStandings)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync()
  ])
}