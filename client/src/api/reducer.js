import produce from 'immer'

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
} from './constants'

// The initial state of the App

export const initialState = {
  loading: {
    nhlTeams: false,
    standings: false,
    series: false,
    auth: false,
  },
  error: {
    nhlTeams: false,
    standings: false,
    series: false,
    auth: false,
  },
  data: {
    nhlTeams: {},
    standings: {},
    series: {},
  },
  isAuth: false,
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
        store.error.nhlTeams = false;
        store.data.nhlTeams = action.payload;
        break;

      case GET_NHL_TEAMS_ERROR:
        store.loading.nhlTeams = false;
        store.error.nhlTeams = action.error;
        break;

      case GET_STANDINGS:
        store.loading.standings = true;
        break;

      case GET_STANDINGS_SUCCESS:
        store.loading.standings = false;
        store.error.standings = false;
        store.data.standings = action.payload;
        break;

      case GET_STANDINGS_ERROR:
        store.loading.standings = false;
        store.error.standings = action.error;
        break;

      case GET_SERIES:
        store.loading.series = true;
        break;

      case GET_SERIES_SUCCESS:
        store.loading.series = false;
        store.error.series = false;
        store.data.series = action.payload;
        break;

      case GET_SERIES_ERROR:
        store.loading.series = false;
        store.error.series = action.error;
        break;
    }
  })

export default Reducers
