import PdfViewer from './PdfViewer'
import Video from './Video'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react';

function CoverPages({ fileslist, coverPageDone }) {
    let viewerKeys = useRef([]);
    
    const getKey = () => {
        let item;
        do
        {
            item = Math.floor(Math.random() * 10000);
        }
        while (viewerKeys.current.includes(item))
        viewerKeys.current = [...viewerKeys.current, item];
        return item;
    };

    return (
        <div id="cover-pages" style={{ display: "none"}}>
            { fileslist.map( (file,index) => ( 
                file.filename.toLowerCase().split('.')[file.filename.toLowerCase().split('.').length - 1] === "pdf" ?
                    (<PdfViewer index={index} viewState={"cover-page"} key={getKey()} 
                        url={file.url} filename={file.filename} coverPageDone={coverPageDone}
                    /> 
                    ):
                    (file.filename.toLowerCase().split('.')[file.filename.toLowerCase().split('.').length - 1] === "mp4"? 
                        <Video  mode={"initial"} index={index} key={getKey()} filename={file.filename} url={file.url} coverPageDone={coverPageDone} />
                        :<Image width={400} height={400} key={getKey()} alt={file.filename} src={file.url} onLoad={() => coverPageDone(index, file.filename, file.url, null)} />
                    )
                ))
            }
        </div>
    )
}

export default CoverPages