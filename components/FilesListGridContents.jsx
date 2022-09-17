import { useState } from 'react';
import FilesList from './FilesList';
import DestinationPrompts from './DestinationPrompts';

function FilesListGridContents(props) {

    if (props.filesUploading)
        return (
            <div id="filesListGrid"> 
                <DestinationPrompts renewList={props.renewFileslist} oldList={props.fileslist} updateState={props.changeFileUploadState} />
            </div>
        );

    return (
        <div>
            <button className="collectionContainerBtns chooseNewDest" onClick={(e) => props.changeFileUploadState(true)}>Choose new folder</button>
            {
                /** To be continued, trying to add the Google drive and One drive icons */
                false ? 
                <div></div>
                : <></>
            }
            <div id="filesListGrid">
                <FilesList
                    fileData={props.fileData}
                    coversLoaded={props.coversLoaded}
                    coversDoneLoading={props.coversDoneLoading}
                    originalList={props.originalList}
                    fileslist={props.fileslist}
                    fileSelected={props.fileSelected}
                    updateFileSelected={props.updateFileSelected}
                />
            </div>
        </div>
    )
}

export default FilesListGridContents