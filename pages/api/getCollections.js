const { connectToDb, getDb } = require('./database/db')

export default async function handler(req, res) {
    // db connection
    let db

    connectToDb((err) => {
        if(!err)
            db = getDb()
    });

    let collectionsFetched = []
    if(db)
    {
        db.collection('UserCollections')
            .find()
            .forEach(collection => collectionsFetched.push(collection))
            .then(() => {
                res.status(200).json(collectionsFetched)
            })
            .catch(() => {
                res.status(500).json({error: 'Could not fetch collections'})
            })
    }
}