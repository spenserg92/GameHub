const mongoose = require('mongoose')
const Game = require('./game')
const db = require('../../config/db')

const startGames = [
    { name: "Mario Kart", developer: "Nintendo", price: 60},
    { name: "Skyrim", developer: "Bethesda", price: 60},
    { name: "Call of Duty", developer: "activision", price: 60},
    { name: "Super Smash Bros", developer: "Nintendo", price: 60}
]

mongoose.connect(db, { useNewUrlParser: true})
    .then(() => {
        Game.deleteMany({owner: null})
            .then(deletedGames => {
                console.log('deleted games in seed script: ', deletedGames)
                Game.create(startGames)
                    .then(newGames => {
                        console.log('new games added to the db: \n', newGames)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log('an error has occured: \n', error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log('an error has occured: \n', error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log('an error has occured: \n', error)

        mongoose.connection.close()
    })