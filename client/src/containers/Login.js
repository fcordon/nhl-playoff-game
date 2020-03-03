import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { makeSelectAuth, makeSelectLoading } from '../api/selectors'

// import { getAuthAction, postAuthAction } from '../api/actions'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 200,
  },
}));

function Login({
  loading,
  isAuth,
  postAuth,
  getAuth
}) {
  const classes = useStyles;

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

  const handleChangeConnect = prop => event => {
    setConnect({ ...connect, [prop]: event.target.value });
  };

  const handleClickShowPasswordConnect = () => {
    setConnect({ ...connect, showPassword: !connect.showPassword });
  };

  const handleChangeInscription = prop => event => {
    setInscription({ ...inscription, [prop]: event.target.value });
  };

  const handleClickShowPasswordInscription = () => {
    setInscription({ ...inscription, showPassword: !inscription.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div className='login-section'>
      <h2>Bienvenue dans le concours Playoff NHL des Elans Gay !!!!</h2>
      <div className='login-section-cards'>
        <Card className='login-section-cards-card'>
          <CardContent>
            <Typography className='login-section-card-title' gutterBottom>
              Inscription
            </Typography>
            <Divider />
            <div className='login-section-card-inputs'>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-nom">Nom</InputLabel>
                <Input
                  id="standard-adornment-nom"
                  type='text'
                  value={inscription.nom}
                  onChange={handleChangeInscription('nom')}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-prenom">Prénom</InputLabel>
                <Input
                  id="standard-adornment-prenom"
                  type='text'
                  value={inscription.prenom}
                  onChange={handleChangeInscription('prenom')}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-pseudo">Pseudo</InputLabel>
                <Input
                  id="standard-adornment-pseudo"
                  type='text'
                  value={inscription.pseudo}
                  onChange={handleChangeInscription('pseudo')}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
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
            <Button variant="contained" color="primary">Valider</Button>
          </CardActions>        
        </Card>
        <Card className='login-section-cards-card'>
          <CardContent>
            <Typography className='login-section-card-title' gutterBottom>
              Connexion
            </Typography>
            <Divider />
            <div className='login-section-card-inputs'>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-pseudo">Pseudo</InputLabel>
                <Input
                  id="standard-adornment-pseudo"
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
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
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
            <Button variant="contained" color="primary">Valider</Button>
          </CardActions>        
        </Card>
      </div>
    </div>
  )
}

Login.propTypes = {
  isAuth: PropTypes.bool,
  Loading: PropTypes.bool,
  // postAuth: PropTypes.func,
  // getAuth: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  isAuth: makeSelectAuth(),
  loading: makeSelectLoading(),
})

function mapDispatchToProps(dispatch) {
  return {
    // postAuth: () => dispatch(postAuthAction()),
    // getAuth: () => dispatch(getAuthAction()),
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
