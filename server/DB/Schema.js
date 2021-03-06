const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drawGameSchema = new Schema({
    playerOne: {
        type: String
    },
    playerTwo: {
        type: String
    },
    score: {
        type: Number
    },
    time: {
        type: String
    }
});

module.exports = mongoose.model('Draw & Guess Scores', drawGameSchema);



