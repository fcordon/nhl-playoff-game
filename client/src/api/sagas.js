import { put, takeLatest, all, call } from 'redux-saga/effects'
import request from '../utils/request'

import {
  GET_NHL_TEAMS,
  GET_STANDINGS,
  GET_SERIES,
  POST_USER,
  GET_USER,
  API_BASE_URL,
  API_GET_TEAMS,
  API_GET_STANDINGS,
  API_GET_SERIES,
  API_USERS,
} from './constants'

import {
  getNhlTeamsSuccessAction,
  getNhlTeamsErrorAction,
  getStandingsSuccessAction,
  getStandingsErrorAction,
  getSeriesSuccessAction,
  getSeriesErrorAction,
  getUserSuccessAction,
  getUserErrorAction,
  postUserSuccessAction,
  postUserErrorAction,
} from './actions'

const requestOptionsGet = {
  method: 'GET',
  mode: 'no-cors'
}

const requestOptionsPost = body => {
  const header = {
    method: 'POST',
    mode: 'no-cors',
    body,
  }

  return header
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

export function* getUser(payload) {
  const userRequestUrl = `${API_USERS}?pseudo=${payload.data.pseudo}&password=${payload.data.password}`

  try {
    const requestResponse = yield call(request, userRequestUrl, requestOptionsGet)

    if (requestResponse.status === 'error') {
      yield put(getUserErrorAction(requestResponse.message));
    } else {
      yield put(getUserSuccessAction(requestResponse.data));
    }
  } catch (error) {
    yield put(getUserErrorAction(error));
  }
}

export function* postUser(newUser) {
  const userRequestUrl = API_USERS

  try {
    const requestResponse = yield call(request, userRequestUrl, requestOptionsPost(newUser.payload))

    if (requestResponse.status === 'error') {
      yield put(postUserErrorAction(requestResponse.message));
    } else {
      yield put(postUserSuccessAction(requestResponse.data));
    }
  } catch (error) {
    yield put(postUserErrorAction(error));
  }
}

function* watchIncrementAsync() {
  yield takeLatest(GET_NHL_TEAMS, getNhlTeams)
  yield takeLatest(GET_STANDINGS, getStandings)
  yield takeLatest(GET_SERIES, getSeries)
  yield takeLatest(GET_USER, getUser)
  yield takeLatest(POST_USER, postUser)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync()
  ])
}