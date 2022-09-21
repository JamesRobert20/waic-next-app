import HeadingComponent from './HeadingComponent'
import CollectionPage from './CollectionPage';
import { useEffect, useState, useRef } from 'react'

function WorkspaceViewer({ numOfWorkspaces, file, workspaceNum, collectionFiles, saveFile, pagesAdded }) {
    const [fileToDisplay, setFileToDisplay] = useState(file);
    const [saveActive, setSaveActive] = useState(false);
    const [undoObject, setUndoObject] = useState({});
    const [heading, setHeading] = useState(fileToDisplay.name);
    const prevHeading = useRef(heading);

    //console.log("workspace ", workspaceNum, "renders ", heading);
    //console.log("workspace ", workspaceNum, "renders the file ", fileToDisplay);

    const updateHeading = newHeading => {
        //console.log("before ", heading);
        //console.log("after ", newHeading); 
        setHeading(newHeading);
    };

    const saveClicked = () => { 
        saveFile({
            name: heading,
            pages: fileToDisplay.pages,
            index: fileToDisplay.index
        });
        setFileToDisplay({
            name: heading,
            pages: fileToDisplay.pages,
            index: fileToDisplay.index
        });
        setSaveActive(false); 
    };

     useEffect(() => {
        //console.log("previous was: ", prevHeading.current);
        //console.log("After is: ", heading);
        if(prevHeading.current !== heading)
        {
            //console.log("name did change");
            prevHeading.current = heading;
            setSaveActive(true);
        }
    }, [heading]); 

    useEffect(() => {
        if(pagesAdded.deckNo === workspaceNum && fileToDisplay.pages)
        {
            if(!saveActive)
                setSaveActive(true);
            setUndoObject({ active: true, from: "morePages", morePages: pagesAdded.pages });
            setFileToDisplay(
                {
                    name: fileToDisplay.name,
                    pages: [...fileToDisplay.pages, ...pagesAdded.pages],
                    index: fileToDisplay.index
                }
            );
        }
    }, [pagesAdded]);

    const removeCollectionPage = pageIndex => {
        if(!saveActive)
            setSaveActive(true);
        setUndoObject({ active: true, from: "cancel", page: fileToDisplay.pages[pageIndex], index: pageIndex });
        setFileToDisplay(
            {
                name: fileToDisplay.name,
                pages: fileToDisplay.pages.filter((collectionPage, index) => index != pageIndex),
                index: fileToDisplay.index
            }
        );
    };

    const undoMorePagesAdded = () => {
        if(!saveActive)
            setSaveActive(true);
        setFileToDisplay(
            {
                name: fileToDisplay.name,
                pages: fileToDisplay.pages.filter(page => !undoObject.morePages.includes(page)),
                index: fileToDisplay.index
            }
        );
        setUndoObject({});
    };

    const undoCollectionPageRemoval = () => {
        if(!saveActive)
            setSaveActive(true);
        setFileToDisplay(
            {
                name: fileToDisplay.name,
                pages: [...fileToDisplay.pages.slice(0, undoObject.index), undoObject.page, ...fileToDisplay.pages.slice(undoObject.index)],
                index: fileToDisplay.index
            }
        );
        setUndoObject({});
    };

    const updateFileToDisplay = selectedOption => {

        setUndoObject({ active: false, from: "", previousOrder: [], page: [], index: null });
        setSaveActive(false);

        if(!selectedOption)
            setFileToDisplay({});
        else
        {
            let selectedFile = collectionFiles.find((file) => file.name === selectedOption);
            //console.log();
            prevHeading.current = selectedFile.name
            setHeading(selectedFile.name);
            setFileToDisplay(selectedFile);
        }
    };

    return (
        <div 
            className={
            numOfWorkspaces === 1 ? 
            "workspace-viewers single-view": 
            numOfWorkspaces === 2 ? 
            "workspace-viewers workspace two-view": 
            "workspace-viewers workspace three-view"
        }>
            <div className="workspace-namer">
            {fileToDisplay.name ?
                <>
                <HeadingComponent heading={heading} updateHeading={updateHeading} />
                <img alt="undo" title="undo"
                    src="images/undo.png" className={undoObject.active ? "undo-button" : "undo-button inactive"} 
                    onClick={
                        undoObject.from === "cancel" ? 
                        () => undoCollectionPageRemoval() :
                        undoObject.from === "morePages" ?
                        () => undoMorePagesAdded() :
                        () => {}
                    } 
                />
                <button 
                    className={saveActive ? "save-deck collectionContainerBtns" : "save-deck collectionContainerBtns inactive"}
                    onClick={saveClicked}
                >
                    Save
                </button>
                </>: <></>
            }
            </div> 
            <div 
                className={
                    numOfWorkspaces === 1 ? 
                    "workspace-displayer single-view-display":
                    numOfWorkspaces === 2 ? 
                    "workspace-displayer two-view-display" : 
                    "workspace-displayer three-view-display"
            }>
                {fileToDisplay.name?
                    fileToDisplay.pages.map((page, index) => (
                        <CollectionPage 
                            key={index} removeCollectionPage={removeCollectionPage} pageSize={numOfWorkspaces === 1 ? "single-view" : numOfWorkspaces === 2 ? "two-view" : "three-view"}
                            pageData={{index: index, sourceData: page.data, name: (page.pageNumber)}} />
                    ))
                    : <></>
                }
            </div>
            <div className={numOfWorkspaces === 3 ? "bottom-navbar-three" : "workspace-bottom-navbar"}>
                <div className={numOfWorkspaces === 3 ? "bottom-select-container-three" : "bottom-select-container"}>
                    <label htmlFor={"deck-to-view-"+workspaceNum} className='bottom-select-labels'>Select deck to view: </label>
                    <select value={fileToDisplay.name} onChange={(e) => updateFileToDisplay(e?.target?.value)} id={"deck-to-view-"+workspaceNum} className="collectionContainerBtns">
                        <option></option>
                        {collectionFiles.map((file, index) => (
                            <option key={index} value={file.name}>{file.name}</option>
                        ))}
                    </select>
                </div>
                <div className={numOfWorkspaces === 3 ? "bottom-select-container-three" : "bottom-select-container"}>
                    <label htmlFor={"deck-to-export-"+workspaceNum} className='bottom-select-labels'>Export as: </label>
                    <select id={"deck-to-export-"+workspaceNum} className="collectionContainerBtns"> 
                        <option></option>
                        <option>Pdf(.pdf)</option>
                        <option>Powerpoint(.pptx)</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceViewer