import produce from 'immer'

import {
  GET_NHL_TEAMS,
  GET_NHL_TEAMS_SUCCESS,
  GET_NHL_TEAMS_ERROR,
} from './constants'

// The initial state of the App

export const initialState = {
  loading: {
    nhlTeams: false,
  },
  error: {
    nhlTeams: false,
  },
  data: {
    nhlTeams: {},
  },
}

/* eslint-disable default-case, no-param-reassign */
const Reducers = (state = initialState, action) =>
  produce(state, store => {
    switch (action.type) {
      case GET_NHL_TEAMS:
        store.loading.nhlTeams = true;
        break;

      case GET_NHL_TEAMS_SUCCESS:
        store.loading.nhlTeams = false;
        store.data.nhlTeams = action.payload;
        break;

      case GET_NHL_TEAMS_ERROR:
        store.loading.nhlTeams = false;
        store.error.nhlTeams = action.error;
        break;
    }
  })

export default Reducers
