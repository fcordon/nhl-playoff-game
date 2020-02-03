//Import Lib
import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'

//Utils
import { useInjectSaga } from '../utils/injectSaga'
import saga from '../sagas'

//Import Material Core
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

//Import Material Icons
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

//Import Actions
import { getNhlTeamsAction } from '../actions/Actions'

//Import Selectors
import { makeSelectNhlTeams } from '../selectors'

const key = 'appStore'

export function Vote({
  getNhlTeams,
  nhlTeams,
}) {
  useInjectSaga({ key, saga })

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
        {nhlTeams.map((team, index) => (
          <div key={team.id}>
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
  nhlTeams: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  nhlTeams: makeSelectNhlTeams(),
})

export function mapDispatchToProps(dispatch) {
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
