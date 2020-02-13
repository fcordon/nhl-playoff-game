import { createSelector } from 'reselect';
import { initialState } from './reducer';

const appModule = state => state.appData || initialState;

const makeSelectNhlTeams = () =>
  createSelector(
    appModule,
    teams => teams.data.nhlTeams,
  );

const makeSelectLoadingTeams = () =>
  createSelector(
    appModule,
    teams => teams.loading.nhlTeams,
  );

export {
  makeSelectNhlTeams,
  makeSelectLoadingTeams,
};
