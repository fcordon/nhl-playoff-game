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
    teams => teams.loading,
  );

const makeSelectAuth = () =>
  createSelector(
    appModule,
    teams => teams.isAuth,
  );

export {
  makeSelectData,
  makeSelectLoading,
  makeSelectAuth,
};
