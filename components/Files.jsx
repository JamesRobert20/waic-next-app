
function Files({ files, coversLoaded, fileData, fileSelected, updateFileSelected }) {
    //console.log(fileData);

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
        <div key={coversLoaded ? fileData[file.filename].index : index} onClick={ () => fileClick(file.filename) } 
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