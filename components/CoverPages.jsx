import PdfViewer from './PdfViewer'
import Video from './Video'
import Image from './Image'
import { useRef, useEffect, useState } from 'react';

function CoverPages({ fileslist, coverPageDone }) {
    const [files, setFiles] = useState(fileslist);
    let viewerKeys = useRef([]);

    useEffect(() => {
        //console.log("changed into", files);
        setFiles(fileslist);
    }, [fileslist]);

    //console.log("rendering...");
    
    
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
            { files.map( (file,index) => ( 
                file.filename.split('.')[file.filename.split('.').length - 1] === "pdf" ?
                    (<PdfViewer index={index} viewState={"cover-page"} key={getKey()} 
                                url={file.url}
                                filename={file.filename}
                                coverPageDone={coverPageDone}
                    /> 
                    ):
                    (file.filename.split('.')[file.filename.split('.').length - 1] === "mp4"? 
                        <Video  mode={"initial"} index={index} key={getKey()} filename={file.filename} url={file.url} coverPageDone={coverPageDone} />: 
                        <Image mode={"initial"} index={index} key={getKey()} filename={file.filename} url={file.url} coverPageDone={coverPageDone} />
                    )
                ))
            }
        </div>
    )
}

export default CoverPages