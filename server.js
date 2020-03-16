// Dependencies
const express = require('express')
const path = require('path')
const app = express()
const bodyParser  = require('body-parser')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')

// Models
const User = require('./models/user');

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

const url = 'mongodb+srv://Razza:CaptainElan2696@cluster0-zxexs.mongodb.net/nhl?retryWrites=true&w=majority'

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

//--------------->>>> START API <<<<--------------

//---->>>> POST USER <<<<----
app.post('/users', function(req, res) {
  const newUser = req.body
  
  User.create(newUser, function(err, addUser) {
    if(err) {
      res.json(err);
    }
    res.json(addUser);
  })
})

//---->>>> GET USER <<<<----
app.get('/users/:pseudo/:password', function(req, res) {
  const userPseudo = req.params.pseudo
  const userPassword = req.params.password

  console.log('req.params : ', req.params)

  User.find({pseudo:userPseudo}, function(err, user) {
    if(err) {
      res.json({status:'error', message:'Problème avec le serveur réessais plus tard !'});
    }
    if(user.password !== userPassword) {
      res.json({status:'error', message:'Le pseudo ou le mot de passe ne correspondent pas !'});
    }
    res.json(user);
  })
})

//--------------->>>> END API <<<<--------------

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
