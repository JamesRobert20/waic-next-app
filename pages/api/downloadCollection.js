const fs = require('fs')
const path = require('path')
const { PDFDocument } = require("pdf-lib")

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
        const collection_name = req.body.collectionName
        const collection_files = req.body.collection_files
        
        const dir = path.join(__dirname, '../../../../public/collections/')
        //fs.readFileSync(theUrl);
        //const existingPdfBytes = await fetch(theUrl).then(resp => resp.arrayBuffer())
        //const pdfDoc = await PDFDocument.load(fs.readFileSync(dir + 'percyjack.pdf'))
        //console.log("api received data as ", pdfDoc);

        //fs.writeFileSync(dir + 'testings.pdf', await pdfDoc.save());
        


        
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
        res.status(201).json("Collection Created Successfuly!")
    }
}