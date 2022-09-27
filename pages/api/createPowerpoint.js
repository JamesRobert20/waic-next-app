const fs = require('fs')
const path = require('path')

export default async function handler(req, res) {
    if(req.method === 'POST')
    {
        const dir = path.join(__dirname, '../../../../public/collections/')
        let fileName = req.body.file_name;
        let collectionName = req.body.collection_name;

        let theSource = path.join("C:\\Users\\jmtendamema\\Downloads\\", fileName+ ".pptx");
        let theDestination = path.join(path.join(dir, collectionName), fileName+ ".pptx");

        console.log("The source is: ");
        console.log(theSource);
        console.log("\nThe destination is: ");
        console.log(theDestination);

        fs.copyFile( theSource, theDestination,
            (err) =>
            {
                if (err) throw err;
                console.log('File was copied to destination');
            }
        );
        res.status(201).json("Powerpoint file copied!")
    }
}