import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import easternConferenceImg from '../img/nhl_eastern_conference.png'
import westernConferenceImg from '../img/nhl_western_conference.png'

import { makeSelectNhlTeams } from '../api/selectors'

import { getNhlTeamsAction } from '../api/actions'

function Vote({getNhlTeams, nhlTeamsData}) {
  const [teamsSelected, setTeamsSelected] = useState([])
  const [teamsCount, setTeamsCount] = useState(0)
  const [teamsCountEastern, setTeamsCountEastern] = useState(0)
  const [inputCheckedEastern, setInputCheckedEastern] = useState({})
  const [teamsCountWestern, setTeamsCountWestern] = useState(0)
  const [inputCheckedWestern, setInputCheckedWestern] = useState({})

  const handleVote = (index, conf) => event => {
    if (event.target.checked && teamsCount < 16) {
      if (conf === 'eastern' && teamsCountEastern < 8) {
        setInputCheckedEastern({...inputCheckedEastern, [index]: true})
        setTeamsCountEastern(teamsCountEastern + 1)
      }
      if (conf === 'western' && teamsCountWestern < 8) {
        setInputCheckedWestern({...inputCheckedWestern, [index]: true})
        setTeamsCountWestern(teamsCountWestern + 1)
      }
      setTeamsSelected([...teamsSelected, event.target.value])
      setTeamsCount(teamsCount + 1)
    }
    if(!event.target.checked) {
      const teamIndex = teamsSelected.indexOf(event.target.value)
      teamsSelected.splice(teamIndex, 1)

      setTeamsSelected(teamsSelected)
      setTeamsCount(teamsCount - 1)

      if (conf === 'eastern') {
        setTeamsCountEastern(teamsCountEastern - 1)
      } else {
        setTeamsCountWestern(teamsCountWestern - 1)
      }
    }
  }

  useEffect(() => {
    getNhlTeams()
  }, [])

  return (
    <div>
      <section className={'teams-count'}>
        <h2>Nombre d'équipes sélectionnées : {teamsCount} / 16</h2>
      </section>
      <section className='Home-vote'>
        <div className={'conference-section eastern'}>
          <header>
            <img className={'conference-section-logo'} src={easternConferenceImg} alt='Eastern conference' />
            <h3>{teamsCountEastern < 8 ? 'tu dois sélectionner 8 équipes dans cette conférence : ' + teamsCountEastern : 'Bravo ! tu as sélectionné tes 8 équipes'}</h3>
          </header>
          {nhlTeamsData.length > 0 && nhlTeamsData.map((team, index) => (
            team.conference.name === 'Eastern' && (
              <div className={'teams'} key={team.name}>
                <img src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + team.id + '.svg'} alt={team.name} />
                <FormControlLabel
                  control={<Checkbox 
                  icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />}
                  value={team.name}
                  onChange={handleVote(index, 'eastern')}
                  disabled={(teamsCountEastern === 8 && !inputCheckedEastern[index])}
                  />}
                  label={team.name}
                />
              </div>
            )
          ))}
        </div>
        <div className={'conference-section western'}>
          <header>
            <img className={'conference-section-logo'} src={westernConferenceImg} alt='Eastern conference' />
            <h3>{teamsCountWestern < 8 ? 'tu dois sélectionner 8 équipes dans cette conférence : ' + teamsCountWestern : 'Bravo ! tu as sélectionné tes 8 équipes'}</h3>
          </header>
          {nhlTeamsData.length > 0 && nhlTeamsData.map((team, index) => (
            team.conference.name === 'Western' && (
              <div className={'teams'} key={team.name}>
                <img src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + team.id + '.svg'} alt={team.name} />
                <FormControlLabel
                  control={<Checkbox 
                  icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />}
                  value={team.name}
                  onChange={handleVote(index, 'western')}
                  disabled={(teamsCountWestern === 8 && !inputCheckedWestern[index])}
                  />}
                  label={team.name}
                />
              </div>
            )
          ))}
        </div>
      </section>
      <Button className={'submit-vote'} variant="contained" disabled={teamsCount < 16} color="primary">Valider</Button>
    </div>
  )
}

Vote.propTypes = {
  getNhlTeams: PropTypes.func,
  nhlTeamsData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
}

const mapStateToProps = createStructuredSelector({
  nhlTeamsData: makeSelectNhlTeams(),
})

function mapDispatchToProps(dispatch) {
  return {
    getNhlTeams: () => dispatch(getNhlTeamsAction()),
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
