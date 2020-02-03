import {
  GET_NHL_TEAMS,
  GET_NHL_TEAMS_SUCCESS,
  GET_NHL_TEAMS_ERROR,
} from '../constants';

/**
 *
 */
export function getNhlTeamsAction() {
  return {
    type: GET_NHL_TEAMS,
  };
}

/**
* @return {object}
*/
export function getNhlTeamsSuccessAction(payload) {
  return {
    type: GET_NHL_TEAMS_SUCCESS,
    payload,
  };
}

/**
 * @param  {object} error The error
 */
export function getNhlTeamsErrorAction(error) {
  return {
    type: GET_NHL_TEAMS_ERROR,
    error,
  };
}
