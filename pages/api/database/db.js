const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/UserLibraries')
            .then(client => {
                dbConnection = client.db()
                return callback()
            })
            .catch(err => {
                console.log(err)
                return callback(err)
            })
    },
    getDb: () => dbConnection
}