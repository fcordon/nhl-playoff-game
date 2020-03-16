const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: {type: String},
    prenom: {type: String},
    pseudo: {type: String},
    password: {type: String}
});

const User = mongoose.model('user', userSchema);
module.exports = User;
