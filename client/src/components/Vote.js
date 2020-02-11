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

import { makeSelectNhlTeams } from '../api/selectors'

import { getNhlTeamsAction } from '../api/actions'

function Vote({getNhlTeams, nhlTeamsData}) {
  const [teamsSelected, setTeamsSelected] = useState([])
  const [teamsCount, setTeamsCount] = useState(0)
  const [inputChecked, setInputChecked] = useState({})

  const handleVote = index => event => {
    if (event.target.checked && teamsCount < 16) {
      setTeamsSelected([...teamsSelected, event.target.value])
      setTeamsCount(teamsCount + 1)
      setInputChecked({...inputChecked, [index]: true})
    }
    if(!event.target.checked) {
      const teamIndex = teamsSelected.indexOf(event.target.value)
      teamsSelected.splice(teamIndex, 1)

      setTeamsSelected(teamsSelected)
      setTeamsCount(teamsCount - 1)
    }
  }

  useEffect(() => {
    getNhlTeams()
  }, [])

  return (
    <div>
      <section>
        Nombre d'équipe sélectionnée : {teamsCount}
      </section>
      <section className='Home-vote'>
        {nhlTeamsData.length > 0 && nhlTeamsData.map((team, index) => (
          <div key={team.name}>
            <img src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + team.id + '.svg'} alt={team.name} />
            <FormControlLabel
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}
              value={team.name}
              onChange={handleVote(index)}
              disabled={(teamsCount === 16 && !inputChecked[index])}
              />}
              label={team.name}
            />
          </div>
        ))}
      </section>
      <section>
        <Button variant="contained" disabled={teamsCount < 16} color="primary">Valider</Button>
      </section>
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
