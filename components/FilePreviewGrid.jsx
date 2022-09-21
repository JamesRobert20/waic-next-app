import Image from "next/image";
import Video from "./Video";
import { useRef } from 'react'

function FilePreviewGrid({ imageData, pagesChosen, blurred, fileSelected }) {

    let extension = fileSelected.toLowerCase().split('.')[fileSelected.toLowerCase().split('.').length - 1];
    let pageKeys = useRef([]);
    
    const getKey = () => {
        let item;
        do
        {
            item = Math.floor(Math.random() * 10000);
        }
        while (pageKeys.current.includes(item))
        pageKeys.current = [...pageKeys.current, item];
        return item;
    }
    
        
    

    return (
        <div id="filePreviewGrid" className={
            blurred ? 
            "reduced-opacity fileOnDisplay" : 
            extension === "mp4" || extension === "png" || extension === "jpg" ? 
            "mediaOnDisplay" : "fileOnDisplay"
        }>
            {imageData.map( (data, index) => (
                extension === "pdf" ?
                <div 
                    key={getKey()} onClick={(e) => pagesChosen.update(index, !pagesChosen.array[index])}
                    className={pagesChosen.array[index] ? "pageDisplayItem pageSelected" : "pageDisplayItem"}
                    
                >
                    <img alt={"Page " + (index + 1)} src={data} className="filePagePreviewed" />
                    <div className="pageNumber">{index + 1}</div>
                </div>
                :extension === "mp4" ?
                <Video key={getKey()} url={data} mode={"preview"} classNameGiven={"video-file"} />
                : <div key={getKey()} className='image-file'><Image src={data} width={400} height={450} /></div>
            ))}
        </div>
    )
}

export default FilePreviewGrid