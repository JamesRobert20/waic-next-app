import { useRef } from "react";
import PdfViewer from "./PdfViewer"

function AllPages({ pagesData, fileData, filename, updateFileData }) {
    let morePages = useRef(pagesData.map( () => ("") ));
    let pagesStatus = useRef(pagesData.map( () => (false) )); 

    const pageDone = (pageNum, filename, imageData) => {
        pagesStatus.current[pageNum - 2] = true;
        morePages.current[pageNum - 2] = imageData;
    
        if(!pagesStatus.current.includes(false))
        {
            let newFileData = {...fileData};
            newFileData[filename].pages.push(...morePages.current);
            updateFileData(newFileData);
        }
    };
    
  return (
    <div className="pages" style={{display: "none"}}>
        {pagesData.map( (pageNum) => (
            (<PdfViewer index={pageNum} viewState={"pages"} key={pageNum} 
                url={fileData[filename].fileUrl}
                filename={filename}
                pageDone={pageDone}
            />) 
        ))}
    </div>
  )
}

export default AllPages