const mongoose = require('mongoose')
const Platform = require('./platform')
const db = require('../../config/db')

const startPlatforms = [
    { name: "Switch", manufacturer: "Nintendo", price: 300},
    { name: "PS5", manufacturer: "Sony", price: 500},
    { name: "XBOX1", manufacturer: "Microsoft", price: 500},
    { name: "N64", manufacturer: "Nintendo", price: 200}
]

mongoose.connect(db, { useNewUrlParser: true})
    .then(() => {
        Platform.deleteMany({owner: null})
            .then(deletedPlatforms => {
                console.log('deleted platforms in seed script: ', deletedPlatforms)

                Platform.create(startPlatforms)
                    .then(newPlatforms => {
                        console.log('new platforms added to the db: \n', newPlatforms)

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