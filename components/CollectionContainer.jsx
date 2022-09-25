import { useState, useEffect, useRef } from 'react'
import CollectionPage from './CollectionPage';
import WorkspaceViewer from './WorkspaceViewer';
import HeadingComponent from './HeadingComponent'
import { GiCancel } from 'react-icons/gi'
import dynamic from 'next/dynamic';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

/* const DragDropContext = dynamic(
    () =>
      import('react-beautiful-dnd').then(mod => {
        return mod.DragDropContext;
      }),
    {ssr: false},
  );
  const Droppable = dynamic(
    () =>
      import('react-beautiful-dnd').then(mod => {
        return mod.Droppable;
      }),
    {ssr: false},
  );
  const Draggable = dynamic(
    () =>
      import('react-beautiful-dnd').then(mod => {
        return mod.Draggable;
      }),
    {ssr: false},
  ); */

  const SortableItem = SortableElement( ({ value, index, elemIn, removePage }) => {
        return (
        <div className="draggableItem-1">
            <CollectionPage  removePage={removePage} pageData={{ index: elemIn, sourceData: value.data, name: (value.pageNumber) }} />
        </div>
        )
    });

const SortableList = SortableContainer( ({ items, removePage, getDraggableKey }) => (
    <div className="collectionViewer">
        {items.map((value, index) => (
            <SortableItem value={value} index={index} key={getDraggableKey(index)} elemIn={index} removePage={removePage} />
        ))}
    </div>
));

function CollectionContainer({ pagesSelected, removePage, resetPagesSelected, updateInsertToCollectionBtn, pagesAdded, resetPagesAdded, changePagesSelected }) {
    const [containerState, setContainerState] = useState("gatheringPages"); 
    const previousPages = useRef(pagesSelected);
    const [topNavUndo, setTopNavUndo] = useState({ active: false, startIndex: 0, amount: 0});
    const [collectionFiles, setCollectionFiles] = useState([]);
    const [viewMode, setViewMode] = useState("Full list");
    const [undoItems, setUndoItems] = useState({ active: false, item: null, index: null });
    const fileClicked = useRef({});

    const draggableKeys = useRef([]);

    const getKey = () => {
        let item;
        do
        {
            item = Math.floor(Math.random() * 10000);
        }
        while (draggableKeys.current.includes(item))
        draggableKeys.current = [...draggableKeys.current, item];
        return item;
    };

    const getDraggableKey = (elemIndex) => {
        if(draggableKeys.current.length < elemIndex + 1)
            return getKey();

        return draggableKeys.current[elemIndex];
    };

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

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if(oldIndex !== newIndex)
        {
            let arr = [...pagesSelected];
            arr.splice(oldIndex, 1);
            //console.log("New array should be ", [...arr.slice(0, newIndex), pagesSelected[oldIndex], ...arr.slice(newIndex)]);
            changePagesSelected([...arr.slice(0, newIndex), pagesSelected[oldIndex], ...arr.slice(newIndex)]);
        }
    }; 

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
                                    Save file
                                </button>
                                <div title="Back to Full List" onClick={() => viewCollectionFiles()}
                                    className={collectionFiles.length > 0 ? 
                                        "back-button collectionContainerBtns" : "back-button collectionContainerBtns inactive"
                                }>
                                    <img alt="back" title="Back to Full List" width="33px" src="images/back.png" id="backButton" />
                                </div>
                            </div>
                            <SortableList items={pagesSelected} onSortEnd={onSortEnd} axis='xy' pressDelay={100} removePage={removePage} getDraggableKey={getDraggableKey} />
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
                                    Create new file
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
                                    </div>:
                                    <>
                                        <WorkspaceViewer 
                                            numOfWorkspaces={Number(viewMode[0])} saveFile={saveCollectionFile}
                                            file={fileClicked.current} workspaceNum={1} collectionFiles={collectionFiles} pagesAdded={pagesAdded}
                                        />
                                        { Number(viewMode[0]) >= 2 &&
                                            <WorkspaceViewer 
                                                numOfWorkspaces={Number(viewMode[0])} saveFile={saveCollectionFile}
                                                file={{}} workspaceNum={2} collectionFiles={collectionFiles} pagesAdded={pagesAdded}
                                            />
                                        }
                                        { Number(viewMode[0]) === 3 &&
                                            <WorkspaceViewer 
                                                numOfWorkspaces={Number(viewMode[0])} saveFile={saveCollectionFile}
                                                file={{}} workspaceNum={3} collectionFiles={collectionFiles} pagesAdded={pagesAdded}
                                            />
                                        }
                                    </>
                                }
                            </div>
                        </>
                    }
                </div>
                <div>
                    <button onClick={() => downloadCollection()} id="download-collection" className="collection-post-btns">Download</button>
                    <button id="save-collection" className="collection-post-btns">Save</button>
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