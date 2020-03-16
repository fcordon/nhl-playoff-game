import {
  GET_NHL_TEAMS,
  GET_NHL_TEAMS_SUCCESS,
  GET_NHL_TEAMS_ERROR,
  GET_STANDINGS,
  GET_STANDINGS_SUCCESS,
  GET_STANDINGS_ERROR,
  GET_SERIES,
  GET_SERIES_SUCCESS,
  GET_SERIES_ERROR,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  POST_USER,
  POST_USER_SUCCESS,
  POST_USER_ERROR,
} from './constants'

// GET NHL TEAMS
export function getNhlTeamsAction() {
  return {
    type: GET_NHL_TEAMS,
  };
}

export function getNhlTeamsSuccessAction(payload) {
  return {
    type: GET_NHL_TEAMS_SUCCESS,
    payload,
  };
}

export function getNhlTeamsErrorAction(error) {
  return {
    type: GET_NHL_TEAMS_ERROR,
    error,
  };
}

// GET STANDINGS
export function getStandingsAction() {
  return {
    type: GET_STANDINGS,
  };
}

export function getStandingsSuccessAction(payload) {
  return {
    type: GET_STANDINGS_SUCCESS,
    payload,
  };
}

export function getStandingsErrorAction(error) {
  return {
    type: GET_STANDINGS_ERROR,
    error,
  };
}

// GET SERIES
export function getSeriesAction() {
  return {
    type: GET_SERIES,
  };
}

export function getSeriesSuccessAction(payload) {
  return {
    type: GET_SERIES_SUCCESS,
    payload,
  };
}

export function getSeriesErrorAction(error) {
  return {
    type: GET_SERIES_ERROR,
    error,
  };
}

// GET USER
export function getUserAction(data) {
  return {
    type: GET_USER,
    data
  };
}

export function getUserSuccessAction(payload) {
  return {
    type: GET_USER_SUCCESS,
    payload,
  };
}

export function getUserErrorAction(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}

// POST USER
export function postUserAction(payload) {
  return {
    type: POST_USER,
    payload
  };
}

export function postUserSuccessAction(payload) {
  return {
    type: POST_USER_SUCCESS,
    payload,
  };
}

export function postUserErrorAction(error) {
  return {
    type: POST_USER_ERROR,
    error,
  };
}
