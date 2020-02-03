import { createSelector } from 'reselect';
import { initialState } from './reducer/Reducers';

const appModule = state => state.offers || initialState;

const makeSelectNhlTeams = () =>
  createSelector(
    appModule,
    nhlTeamsState => nhlTeamsState.nhlTeams.data,
  );

export {
  makeSelectNhlTeams,
}