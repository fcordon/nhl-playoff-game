import {
  GET_NHL_TEAMS,
  GET_NHL_TEAMS_SUCCESS,
  GET_NHL_TEAMS_ERROR,
  GET_STANDINGS,
  GET_STANDINGS_SUCCESS,
  GET_STANDINGS_ERROR,
} from './constants'

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