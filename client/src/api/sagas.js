import { put, takeLatest, all, call } from 'redux-saga/effects'
import request from '../utils/request'

import {
  GET_NHL_TEAMS,
  GET_STANDINGS,
  GET_SERIES,
  API_BASE_URL,
  API_GET_TEAMS,
  API_GET_STANDINGS,
  API_GET_SERIES,
} from './constants'

import {
  getNhlTeamsSuccessAction,
  getNhlTeamsErrorAction,
  getStandingsSuccessAction,
  getStandingsErrorAction,
  getSeriesSuccessAction,
  getSeriesErrorAction,
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
  const standingsRequestUrl = API_BASE_URL + API_GET_STANDINGS

  try {
    const requestResponse = yield call(request, standingsRequestUrl, requestOptionsGet)

    if (requestResponse.status === 'error') {
      yield put(getStandingsErrorAction(requestResponse.message));
    } else {
      yield put(getStandingsSuccessAction(requestResponse.data.records));
    }
  } catch (error) {
    yield put(getStandingsErrorAction(error));
  }
}

export function* getSeries() {
  const seriesRequestUrl = API_BASE_URL + API_GET_SERIES

  try {
    const requestResponse = yield call(request, seriesRequestUrl, requestOptionsGet)

    if (requestResponse.status === 'error') {
      yield put(getSeriesErrorAction(requestResponse.message));
    } else {
      yield put(getSeriesSuccessAction(requestResponse.data.records));
    }
  } catch (error) {
    yield put(getSeriesErrorAction(error));
  }
}

function* watchIncrementAsync() {
  yield takeLatest(GET_NHL_TEAMS, getNhlTeams)
  yield takeLatest(GET_STANDINGS, getStandings)
  yield takeLatest(GET_SERIES, getSeries)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync()
  ])
}