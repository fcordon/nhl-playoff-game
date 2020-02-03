//Imports
import produce from 'immer'
import {
  GET_NHL_TEAMS,
  GET_NHL_TEAMS_SUCCESS,
  GET_NHL_TEAMS_ERROR,
} from '../constants';

// The initial state of the App
export const initialState = {
  nhlTeams: {
    error: false,
    loading: false,
    data: [],
  },
}

const appReducer = (state = initialState, action) =>
  produce(state, store => {
    switch (action.type) {
      case GET_NHL_TEAMS:
        store.nhlTeams.loading = true
        break;

      case GET_NHL_TEAMS_SUCCESS:
        store.nhlTeams.loading = false
        store.nhlTeams.data = action.payload
        break;

      case GET_NHL_TEAMS_ERROR:
        store.nhlTeams.loading = false
        store.nhlTeams.error = action.error
        break;

      default:
        break;
    }
  })

export default appReducer