import { useState, useEffect, useRef } from 'react'
import CollectionPage from './CollectionPage';
import Workspaces from './Workspaces';
import HeadingComponent from './HeadingComponent'
import { GiCancel } from 'react-icons/gi'

function CollectionContainer({ pagesSelected, removePage, resetPagesSelected, updateInsertToCollectionBtn, pagesAdded, resetPagesAdded }) {
    const [containerState, setContainerState] = useState("gatheringPages"); 
    const previousPages = useRef(pagesSelected);
    const [topNavUndo, setTopNavUndo] = useState({ active: false, startIndex: 0, amount: 0});
    const [collectionFiles, setCollectionFiles] = useState([]);
    const [viewMode, setViewMode] = useState("Full list");
    const [undoItems, setUndoItems] = useState({ active: false, item: null, index: null });
    const fileClicked = useRef({});

    const [collectionHeading, setCollectionHeading] = useState("My New Collection");

    const updateCollectionHeading = newHeading => {
        setCollectionHeading(newHeading);
    };

    const downloadCollection = () => {
        console.log("The collection has: ", collectionFiles);
    };

    useEffect(() => {
        //console.log(pagesSelected.filter(page => !previousPages.current.includes(page)));

        if(pagesSelected.length <= previousPages.current.length)
            setTopNavUndo({ active: false, startIndex: 0, amount: 0 });
        else
        {
            setTopNavUndo({
                active: true, startIndex: previousPages.current.length, 
                amount: pagesSelected.length - previousPages.current.length 
            });
        }
        previousPages.current = pagesSelected;
    }, [pagesSelected]);

    const getNewFileName = () => {
        let index = collectionFiles.length;
        if(index === 0)
            return "Filename-1";
        
        do
        {
            index--;
        }
        while(index >= 0 && !collectionFiles[index].name.includes("Filename-"));

        if(index < 0)
            return "Filename-1";

        return "Filename-"+(Number(collectionFiles[index].name.slice(9)) + 1);
    };

    const updateCollectionFiles = () => {
        if(pagesSelected.length > 0)
        {
            updateInsertToCollectionBtn(1);
            setCollectionFiles([...collectionFiles, {name: getNewFileName(), pages: pagesSelected, index: collectionFiles.length}]);
            setViewMode("Full list");
            setContainerState("displayCollectionFiles");
            resetPagesSelected();
        }
    };

    const saveCollectionFile = file => {
        resetPagesAdded();
        setCollectionFiles([...collectionFiles.slice(0, file.index), file, ...collectionFiles.slice(file.index + 1)]);
    };

    const viewCollectionFiles = () => {
        updateInsertToCollectionBtn(1);
        setViewMode("Full list");
        setContainerState("displayCollectionFiles");
    };

    const createNewCollectionFile = () => {
        setUndoItems({ active: false, item: null, index: null });
        setContainerState("gatheringPages");
        updateInsertToCollectionBtn(0);
    };

    const removeFile = (file, index) => {
        let arr = [...collectionFiles];
        arr.splice(index, 1);
        setCollectionFiles(arr);
        setUndoItems({ active: true, item: file, index: index });
    };

    const undoFileRemoval = () => {
        setCollectionFiles([...collectionFiles.slice(0, undoItems.index), undoItems.item, ...collectionFiles.slice(undoItems.index)]);
        setUndoItems({ active: false, item: null, index: null });
    };

    const openFile = (file) => {
        fileClicked.current = file;
        setViewMode("1 deck");
        updateInsertToCollectionBtn(2);
    };
    
    const changeViewMode = newMode => {
        if(newMode ==="Full list")
        {
            fileClicked.current = {};
            updateInsertToCollectionBtn(1);
            resetPagesAdded();
        }
        else
            updateInsertToCollectionBtn(Number(newMode[0]) + 1);

        setViewMode(newMode);
    };
    
    //console.log("These pages ", pagesSelected, "have been selected");

    return (
        <div id="collection-tags-Parent">
            <div className="CollectionContainer">
                <HeadingComponent heading={collectionHeading} updateHeading={updateCollectionHeading} />
                <div id="deckContainer" className="deckGridContainers">
                    {containerState === "gatheringPages" ?
                        <>
                            <div id="package-navbar">
                                <div title="Undo" onClick={() => removePage(topNavUndo.startIndex, topNavUndo.amount)}
                                    className={topNavUndo.active ? 
                                        "undo-button collectionContainerBtns" : "undo-button collectionContainerBtns inactive"
                                }>
                                    <img alt="undo" title="Undo" width="25px" src="images/undo.png" />
                                </div>
                                <button 
                                    id="add-to-workspace" className="collectionContainerBtns decks-change-button"
                                    onClick={() => updateCollectionFiles()}
                                >
                                    Add to workspace
                                </button>
                                <div title="Back to Full List" onClick={() => viewCollectionFiles()}
                                    className={collectionFiles.length > 0 ? 
                                        "back-button collectionContainerBtns" : "back-button collectionContainerBtns inactive"
                                }>
                                    <img alt="back" title="Back to Full List" width="33px" src="images/back.png" id="backButton" />
                                </div>
                            </div>
                            <div id="collectionViewer">
                                {pagesSelected.map((page, index) => (
                                    <CollectionPage key={index} removePage={removePage}
                                        pageData={{index: index, sourceData: page.data, name: (page.pageNumber+1)}} />
                                ))}
                            </div>
                        </>:
                        <>
                            <div id="package-navbar">
                                <div title="Undo" onClick={() => undoFileRemoval()}
                                    className={undoItems.active ? 
                                        "undo-button collectionContainerBtns" : "undo-button collectionContainerBtns inactive"
                                }>
                                    <img alt="undo" title="Undo" width="25px" src="images/undo.png" />
                                </div>
                                <button 
                                    id="create-new-workspace" onClick={() => createNewCollectionFile()}
                                    className="collectionContainerBtns decks-change-button"
                                >
                                    Create new workspace
                                </button>
                                <select 
                                    id="select-number-of-decks" className="collectionContainerBtns"
                                    value={viewMode} onChange={(e) => changeViewMode(e?.target?.value)}
                                >
                                    <option className="decks-options" value="Full list">Full list</option>
                                    <option className="decks-options" value="1 deck">1 deck</option>
                                    <option className="decks-options" value="2 decks">2 decks</option>
                                    <option className="decks-options" value="3 decks">3 decks</option>
                                </select>
                                <label id="viewMode-label" htmlFor="select-number-of-decks">View mode:</label>
                            </div>
                            <div id="innerDecksViewer">
                                {viewMode === "Full list" ? 
                                    <div id="full-mode">
                                        {collectionFiles.map((file, index) => (
                                            <div key={index} className="upperWSContainer">
                                                <div 
                                                    title="open file"className="theWorkspaces"
                                                    onClick={() => openFile(file)}>{file.name}</div>
                                                <div className="cancelContainer-2">
                                                    <div 
                                                        title="remove this file" className="cancelBtn"
                                                        onClick={() => removeFile(file, index)}
                                                    >
                                                        <GiCancel className="cancelImg" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :<Workspaces 
                                        saveCollectionFile={saveCollectionFile}
                                        number={Number(viewMode[0])} fileClicked={fileClicked.current} 
                                        collectionFiles={collectionFiles} pagesAdded={pagesAdded} 
                                    />
                                }
                            </div>
                        </>
                    }
                </div>
                <div>
                    <button id="save-collection" className="collection-post-btns">Save Collection</button>
                    <button onClick={() => downloadCollection()} id="download-collection" className="collection-post-btns">Download Collection</button>
                </div> 
            </div>
            <div style={{display: "none"}}>
                <h2 id="add-tags-heading" className="deckGridHeadings" style={{opacity: "0", "pointerEvents": "none"}}>Add Tags</h2>
                <div id="tagsContainer" className="deckGridContainers invisible" style={{opacity: "0"}}>
                    <div id="tagInputContainer">
                        <input id="tagInput" className="full-basis" placeholder="Type a tag name to add" />
                        <img alt="add" id="plus-button" style={{display: "none"}} src="images/addNew.png" />
                    </div>
                    <div id="tagsBatch"></div>
                </div>
            </div>
        </div>
    )
}

export default CollectionContainer