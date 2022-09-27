import { connectToDb, getDb } from './database/db'

export default async function handler(req, res) {
    // db connection
    let db

    connectToDb((err) => {
        if(!err)
            db = getDb()
        return db
    });

    setTimeout(() => {
        let collectionsFetched = []
        if(db)
        {
            console.log("connection made")
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
        else
        {
            res.status(500).json({error: 'Database did not connect'})
        }
    }, 4000);
    
}