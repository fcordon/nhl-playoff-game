import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'

import CircularProgress from '@material-ui/core/CircularProgress'

import TableStandings from '../components/TableStandings'

import { makeSelectData, makeSelectLoading } from '../api/selectors'

import { getStandingsAction } from '../api/actions'

function Vote({
  getStandings,
  appData,
  loading,
}) {

  const [eastStanding, setEastStanding] = useState([])
  const [westStanding, setWestStanding] = useState([])
  
  useEffect(() => {
    getStandings()
  }, [])

  function positionSort (teamArray) {
    teamArray.sort((a,b) => {
      const numeroA = a.position
      const numeroB = b.position

      let comparison = 0;
      if (numeroA > numeroB) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    })
  }

  useEffect(() => {
    let easternStanding = []
    let westernStanding = []
    
    appData.standings.length > 0 && appData.standings.map(standing => {
      standing.conference.name === 'Eastern' && standing.teamRecords.map(record => {
        easternStanding = [...easternStanding, {'position':record.conferenceRank < 10 ? 0 + record.conferenceRank : record.conferenceRank,'name':record.team.name,'wins':record.leagueRecord.wins,'losses':record.leagueRecord.losses,'ot':record.leagueRecord.ot,'gamesPlayed':record.gamesPlayed,'points':record.points,'id':record.team.id}]
      })
      standing.conference.name === 'Western' && standing.teamRecords.map(record => {
        westernStanding = [...westernStanding, {'position':record.conferenceRank < 10 ? 0 + record.conferenceRank : record.conferenceRank,'name':record.team.name,'wins':record.leagueRecord.wins,'losses':record.leagueRecord.losses,'ot':record.leagueRecord.ot,'gamesPlayed':record.gamesPlayed,'points':record.points,'id':record.team.id}]
      })
    })

    positionSort(easternStanding)
    positionSort(westernStanding)

    setEastStanding(easternStanding)
    setWestStanding(westernStanding)
  }, [appData.standings])

  return (
    <div className='standings-section'>
      {loading.standings ? <CircularProgress /> : (
        <div className='standings-table'>
          <div className='table eastern'>
            <TableStandings conferenceStandings={eastStanding} conferenceImg={'eastern'}/>
          </div>
          <div className='table western'>
            <TableStandings conferenceStandings={westStanding} conferenceImg={'western'}/>
          </div>
        </div>
      )}
    </div>
  )
}

Vote.propTypes = {
  getStandings: PropTypes.func,
  appData: PropTypes.object,
  loading: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  appData: makeSelectData(),
  loading: makeSelectLoading(),
})

function mapDispatchToProps(dispatch) {
  return {
    getStandings: () => dispatch(getStandingsAction()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(Vote)
