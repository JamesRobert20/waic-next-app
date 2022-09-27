const fs = require('fs')
const path = require('path')
const { PDFDocument } = require("pdf-lib")
import { collections } from '../../SavedCollections/collections'
import { connectToDb, getDb } from './database/db'

async function createPDF(fileName, content, directory) {
    const newDoc = await PDFDocument.create();
  
    for (const page of content) {
      const { fileFrom, pageNumber } = page
      const oldDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, '../../../../public/files/')+ fileFrom));
  
      let pages = await newDoc.copyPages(oldDoc, [parseInt(pageNumber)-1]);
      newDoc.addPage(pages[0])
    }
    fs.writeFileSync(directory + `${fileName}.pdf`, await newDoc.save());
}

export default async function handler(req, res) {
    if(req.method === 'POST')
    {
        // db connection
        let db

        connectToDb((err) => {
            if(!err)
                db = getDb()
        });

        const user = req.body.user;
        const collection_name = req.body.collectionName
        const collection_files = req.body.collection_files

        collections.push({ user, collection_name, collection_files });
        const dir = path.join(__dirname, '../../../../SavedCollections/')
        
        var newDir = dir + collection_name+'/'
          
        // create directory for collection if it doesn't exist
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, {
            mode: 0o744,
            });
        }
        for (const newFile of collection_files) {
            if (newFile.exportAs != "Powerpoint(.pptx)") {
            await createPDF(newFile.name, newFile.pages, newDir)
            }
        } 

        if(db)
        {
            console.log('connection made')
            db.collection('UserCollections')
                .insertOne({ user, collection_name, collection_files })
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
        res.status(201).json("Your collection has been saved!")
    }
}