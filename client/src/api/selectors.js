import { createSelector } from 'reselect';
import { initialState } from './reducer';

const appModule = state => state.appData || initialState;

const makeSelectData = () =>
  createSelector(
    appModule,
    app => app.data,
  );

const makeSelectLoading = () =>
  createSelector(
    appModule,
    app => app.loading,
  );

const makeSelectError = () =>
  createSelector(
    appModule,
    app => app.error,
  );

export {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
};
