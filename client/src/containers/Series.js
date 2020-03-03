import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'

import CircularProgress from '@material-ui/core/CircularProgress'

import { makeSelectData, makeSelectLoading } from '../api/selectors'

import { getSeriesAction } from '../api/actions'

function Series({
  getSeries,
  appData,
  loading
}) {
  
  useEffect(() => {
    getSeries()
  }, [])

  return (
    <div className='nhl-series-section'>
      {loading.series ? <CircularProgress /> : appData.series}
    </div>
  )
}

Series.propTypes = {
  getSeries: PropTypes.func,
  appData: PropTypes.object,
  loading: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  appData: makeSelectData(),
  loading: makeSelectLoading(),
})

function mapDispatchToProps(dispatch) {
  return {
    getSeries: () => dispatch(getSeriesAction()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(Series)
