import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import easternConferenceImg from '../img/nhl_eastern_conference.png'
import westernConferenceImg from '../img/nhl_western_conference.png'

export default function TableStandings({ conferenceStandings, conferenceImg }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className='conference-img' align='center'>
              <img src={conferenceImg === 'eastern' ? easternConferenceImg : westernConferenceImg} alt={conferenceImg} />
            </TableCell>
            <TableCell colSpan={2} align='center'>Équipe</TableCell>
            <TableCell align='center'>GP</TableCell>
            <TableCell align='center'>Wins</TableCell>
            <TableCell align='center'>Losses</TableCell>
            <TableCell align='center'>OT</TableCell>
            <TableCell align='center'>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conferenceStandings.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell align='center' component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell className='nameCell'>
                <img src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + row.id + '.svg'} alt={row.name} />
              </TableCell>
              <TableCell className='nameCell'>
                <span>{row.name}</span>
              </TableCell>
              <TableCell align='center'>{row.gamesPlayed}</TableCell>
              <TableCell align='center'>{row.wins}</TableCell>
              <TableCell align='center'>{row.losses}</TableCell>
              <TableCell align='center'>{row.ot}</TableCell>
              <TableCell align='center'>{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
