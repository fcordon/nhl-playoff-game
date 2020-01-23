// Dependencies
const express = require('express')
const path = require('path')
const app = express()
const bodyParser  = require('body-parser')
const port = process.env.PORT || 5000
const fs = require('fs')
const mongoose = require('mongoose')

// Models
const Calendrier = require('./models/calendrier')
const Championnat = require('./models/championnat')
const Classement = require('./models/classement')
const Joueurs = require('./models/joueur')

// Server
app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')))

// API
mongoose.Promise = global.Promise

const url = 'mongodb+srv://Razza:CaptainElan2696@cluster0-c4fum.mongodb.net/elans?retryWrites=true&w=majority'

async function main() {
  const client = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client
    console.log('Connection established to MongoDB !')
  } catch (err) {
    console.dir(err)
  }
}

main().catch(console.dir)

// START API

//---->>>> GET CALENDRIER <<<<----
app.get('/calendrierbdd', async (req, res) => {
  const calendrier = await Calendrier.find()
  return res.json(calendrier)
})

//---->>>> POST CALENDRIER <<<<----
app.post('/calendrierbdd', function(req, res) {
  let series = req.body;

  Calendrier.create(series, function(err, serie) {
    if(err) {
      throw err;
    }
    res.json(serie);
  })
})

//---->>>> UPDATE CALENDRIER <<<<----
app.put('/calendrierbdd/:_id', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      score1: newData.score1,
      score2: newData.score2,
      resultat: newData.resultat
    }
  };

  let options = {new: false};

  Calendrier.updateOne({_id: req.params._id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//---->>>> GET CLASSEMENT <<<<----
app.get('/classementbdd', async (req, res) => {
  const classement = await Classement.find()
  return res.json(classement)
})

//---->>>> UPDATE CLASSEMENT <<<<----
app.put('/classementbdd/:_id', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      match: newData.match,
      victoire: newData.victoire,
      nul: newData.nul,
      defaite: newData.defaite,
      butsplus: newData.butsplus,
      butsmoins: newData.butsmoins,
      diff: newData.diff,
      points: newData.points,
      malus: newData.malus
    }
  };

  let options = {new: false};

  Classement.updateOne({_id: req.params._id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//---->>>> GET JOUEURS <<<<----
app.get('/joueurs', async (req, res) => {
  const joueurs = await Joueurs.find()
  return res.json(joueurs)
})

//---->>>> UPDATE JOUEURS <<<<----
app.put('/joueurs/:_id', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      match: newData.match,
      buts: newData.buts,
      assists: newData.assists,
      points: newData.points,
      penalites: newData.penalites
    }
  };

  let options = {new: false};

  Joueurs.updateOne({_id: req.params._id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//---->>>> GET CHAMPIONNAT <<<<----
app.get('/championnat', async (req, res) => {
  const calendrier = await Championnat.find()
  return res.json(calendrier)
})

//---->>>> UPDATE CHAMPIONNAT <<<<----
app.put('/championnat/:_id', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      score1: newData.score1,
      score2: newData.score2
    }
  };

  let options = {new: false};

  Championnat.updateOne({_id: req.params._id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//--------------->>>> END API <<<<--------------

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
