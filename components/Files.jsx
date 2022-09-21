import { useContext, useRef } from 'react';
import FilesContext from '../contexts/filesContext'

function Files() {
    const { fileslist: files, coversLoaded, fileData, fileSelected, updateFileSelected } = useContext(FilesContext);

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

    const getFileName = filename => {
        var Splitted = filename.split('.');
        return filename.slice(0, filename.indexOf(Splitted[Splitted.length - 1]) - 1);
    };

    const fileClick = filename => {
        if(fileSelected && (fileSelected === filename))
            updateFileSelected("");
        else
            updateFileSelected(filename);
    };

    return files.map((file, index) => (
        <div key={getKey()} onClick={ () => fileClick(file.filename) } 
            className={ "search-result " + (fileSelected === file.filename ? "fileSelected" : "") } >
            { coversLoaded ? 
                file.filename.split('.')[file.filename.split('.').length - 1] === "mp4" ?
                    (<video className="result-file" src={fileData[file.filename].pages[0]}>Your browser does not support video preview!</video>)
                    :(<img alt={getFileName(file.filename) + " cover page"} className="result-file" src={fileData[file.filename].pages[0]} />)
                :(<div className="result-file"></div>) 
            }
            <div className="result-file-name">
                {getFileName(file.filename)}
            </div>
        </div>
    ));
    
}

export default Files