import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { makeSelectLoading, makeSelectData, makeSelectError } from '../api/selectors'

import { postUserAction, getUserAction } from '../api/actions'

function Login({
  postUser,
  getUser,
  loading,
  storeData,
  storeError,
}) {

  const [connect, setConnect] = useState({
    pseudo: '',
    password: '',
    showPassword: false,
  });

  const [inscription, setInscription] = useState({
    nom: '',
    prenom: '',
    pseudo: '',
    password: '',
    showPassword: false,
  });

  const [isInscriptionDisabled, setIsInscriptionDisabled] = useState(false)
  const [isConnectDisabled, setIsConnectDisabled] = useState(false)

  // useEffect(() => {
  //   getUser()
  // }, [])

  const handleChangeConnect = prop => event => {
    setConnect({ ...connect, [prop]: event.target.value });
    setIsConnectDisabled(canLogin())
  }

  const handleClickShowPasswordConnect = () => {
    setConnect({ ...connect, showPassword: !connect.showPassword });
  }

  const handleChangeInscription = prop => event => {
    setInscription({ ...inscription, [prop]: event.target.value });
    setIsInscriptionDisabled(canLogup())
  }

  const canLogup = () => inscription.nom && inscription.prenom && inscription.pseudo && inscription.password
  const canLogin = () => connect.pseudo && connect.password

  const handleClickShowPasswordInscription = () => {
    setInscription({ ...inscription, showPassword: !inscription.showPassword });
  }

  const handleMouseDownPassword = event => {
    event.preventDefault();
  }

  const handleInscription = () => {
    const dataInscription = {
      nom: inscription.nom,
      prenom: inscription.prenom,
      pseudo: inscription.pseudo,
      password: inscription.password
    }

    // storeData.find(element => {
    //   if(element.)
    // })

    postUser(dataInscription)
  }

  const handleConnect = () => {
    const dataConnect = {
      pseudo: connect.pseudo,
      password: connect.password
    }

    getUser(dataConnect)
  }

  return (
    <div className='login-section'>
      <Backdrop className='backdrop-component' open={loading.user}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2>Bienvenue dans le concours Playoff NHL des Elans Gay !!!!</h2>
      <div className='login-section-cards'>
        <Card className='login-section-cards-card'>
          <CardContent>
            <Typography className='login-section-card-title' gutterBottom>
              Inscription
            </Typography>
            <Divider />
            <div className='login-section-card-inputs'>
              <FormControl className='inputs'>
                <InputLabel htmlFor="standard-adornment-nom">Nom</InputLabel>
                <Input
                  id="standard-adornment-nom"
                  type='text'
                  value={inscription.nom}
                  onChange={handleChangeInscription('nom')}
                />
              </FormControl>
              <FormControl className='inputs'>
                <InputLabel htmlFor="standard-adornment-prenom">Prénom</InputLabel>
                <Input
                  id="standard-adornment-prenom"
                  type='text'
                  value={inscription.prenom}
                  onChange={handleChangeInscription('prenom')}
                />
              </FormControl>
              <FormControl className='inputs'>
                <InputLabel htmlFor="standard-adornment-pseudo-inscription">Pseudo</InputLabel>
                <Input
                  id="standard-adornment-pseudo-inscription"
                  type='text'
                  value={inscription.pseudo}
                  onChange={handleChangeInscription('pseudo')}
                />
              </FormControl>
              <FormControl className='inputs'>
                <InputLabel htmlFor="standard-adornment-password-inscription">Password</InputLabel>
                <Input
                  id="standard-adornment-password-inscription"
                  type={inscription.showPassword ? 'text' : 'password'}
                  value={inscription.password}
                  onChange={handleChangeInscription('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordInscription}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {inscription.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleInscription}
              disabled={!isInscriptionDisabled}
            >
              Valider
            </Button>
          </CardActions>        
        </Card>
        <Card className='login-section-cards-card'>
          <CardContent>
            <Typography className='login-section-card-title' gutterBottom>
              Connexion
            </Typography>
            <Divider />
            <div className='login-section-card-inputs'>
              <FormControl className='inputs'>
                <InputLabel htmlFor="standard-adornment-pseudo-connect">Pseudo</InputLabel>
                <Input
                  id="standard-adornment-pseudo-connect"
                  type='text'
                  value={connect.pseudo}
                  onChange={handleChangeConnect('pseudo')}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className='inputs'>
                <InputLabel htmlFor="standard-adornment-password-connect">Password</InputLabel>
                <Input
                  id="standard-adornment-password-connect"
                  type={connect.showPassword ? 'text' : 'password'}
                  value={connect.password}
                  onChange={handleChangeConnect('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConnect}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {connect.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleConnect}
              disabled={!isConnectDisabled}
            >
              Valider
            </Button>
            {storeError.user && (
              <p>{storeError.user}</p>
            )}
          </CardActions>        
        </Card>
      </div>
    </div>
  )
}

Login.propTypes = {
  postUser: PropTypes.func,
  getUser: PropTypes.func,
  loading: PropTypes.object,
  storeData: PropTypes.object,
  storeError: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  storeData: makeSelectData(),
  storeError: makeSelectError(),
})

function mapDispatchToProps(dispatch) {
  return {
    postUser: data => dispatch(postUserAction(data)),
    getUser: data => dispatch(getUserAction(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(Login)
