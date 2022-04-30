const mongoose = require('mongoose');
require('dotenv').config()
const mongoDB = process.env.DB
const drawGameModel = require('./Schema')

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const saveSession = async (gameData) => {
    await drawGameModel.create(gameData)
}

const getHighScore = async () => {
    return await drawGameModel.find().sort({ score: -1 }).limit(1)
}

module.exports = { saveSession, getHighScore }
