import { useEffect, useState, useRef } from 'react'
import WorkspaceViewer from './WorkspaceViewer'

function Workspaces({ number, fileClicked, collectionFiles, saveCollectionFile, pagesAdded }) {
    //const [arrWorkspaces, setArrWorkspaces] = useState([]);

    /* useEffect(() => {
        let arr = [];
        let data = "";

        if(number === 1)
            data = "single-file-mode";
        else if(number === 2)
            data = "workspace two-view";
        else
            data = "workspace three-view";

        for(let i = 0; i < number; i++)
        {
            arr.push(data);
        }
    
        setArrWorkspaces(arr);
    }, [number]); */

    return (
        <>
            <WorkspaceViewer 
                numOfWorkspaces={number} saveFile={saveCollectionFile}
                file={fileClicked} workspaceNum={1} collectionFiles={collectionFiles} pagesAdded={pagesAdded}
            />
            { number >= 2 ? 
                <WorkspaceViewer 
                    numOfWorkspaces={number} saveFile={saveCollectionFile}
                    file={{}} workspaceNum={2} collectionFiles={collectionFiles} pagesAdded={pagesAdded}
                />
                : <></>
            }
            { number === 3 ? 
                <WorkspaceViewer 
                    numOfWorkspaces={number} saveFile={saveCollectionFile}
                    file={{}} workspaceNum={3} collectionFiles={collectionFiles} pagesAdded={pagesAdded}
                />
                : <></> 
            }
        </>
    )
}

export default Workspaces