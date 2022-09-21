import FilesList from './FilesList';
import DestinationPrompts from './DestinationPrompts';

function FilesListGridContents({ filesUploading, changeFileUploadState }) {

    if (filesUploading)
        return (
            <div id="filesListGrid"> 
                <DestinationPrompts />
            </div>
        );

    return (
        <div>
            <button className="collectionContainerBtns chooseNewDest" onClick={(e) => changeFileUploadState(true)}>Choose new folder</button>
            {
                /** To be continued, trying to add the Google drive and One drive icons */
                false ? 
                <div></div>
                : <></>
            }
            <div id="filesListGrid">
                <FilesList />
            </div>
        </div>
    )
}

export default FilesListGridContents