import { createSelector } from 'reselect';
import { initialState } from './reducer';

const appModule = state => state.appData || initialState;

const makeSelectData = () =>
  createSelector(
    appModule,
    teams => teams.data,
  );

const makeSelectLoading = () =>
  createSelector(
    appModule,
    teams => teams.loading.nhlTeams,
  );

export {
  makeSelectData,
  makeSelectLoading,
};
