import { useState, useEffect, useRef, useContext } from 'react'
import CollectionPage from './CollectionPage';
import WorkspaceViewer from './WorkspaceViewer';
import HeadingComponent from './HeadingComponent'
import { GiCancel } from 'react-icons/gi'
import UserAuthenticationContext from '../User/userAuthenticator'
import pptxgen from 'pptxgenjs'
//import dynamic from 'next/dynamic';
//import { PDFDocument } from 'pdf-lib'

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

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

function CollectionContainer({ fileData, pagesSelected, removePage, resetPagesSelected, updateInsertToCollectionBtn, pagesAdded, resetPagesAdded, changePagesSelected }) {
    const [containerState, setContainerState] = useState("gatheringPages"); 
    const previousPages = useRef(pagesSelected);
    const [topNavUndo, setTopNavUndo] = useState({ active: false, startIndex: 0, amount: 0});
    const [collectionFiles, setCollectionFiles] = useState([]);
    const [viewMode, setViewMode] = useState("Full list");
    const [undoItems, setUndoItems] = useState({ active: false, item: null, index: null });
    const [collectionHeading, setCollectionHeading] = useState("My New Collection");
    const { user } = useContext(UserAuthenticationContext);

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

    

    const updateCollectionHeading = newHeading => {
        setCollectionHeading(newHeading);
    };

    async function downloadCollection(mode)
    {
        try
        {
            
            //let urL = fileData["percyjack.pdf"].fileUrl;
            //console.log("the file url given was: ", urL);

            //const existingPdfBytes = await fetch(urL).then(res => res.arrayBuffer());
            //console.log(existingPdfBytes);
            //const pdfDoc = await PDFDocument.load(existingPdfBytes);
            //const pdfBytes = await pdfDoc.save();

            //console.log(pdfBytes);

            //fs.writeFileSync('/files/testings.pdf', pdfBytes)

            //console.log("what does his return ", existingPdfBytes)
            //console.log(collectionFiles);
            let remadeFiles = collectionFiles.map(file => ({ 
                name: file.name, 
                index: file.index, 
                pages: file.pages.map(page => ({ fileFrom: page.filename, pageNumber: page.pageNumber })),
                exportAs: file.exportAs ? file.exportAs : file.pages.every(page => {
                    let splitted = page.filename.toLowerCase().split('.')
                    let fileExtension = splitted[splitted.length - 1]
                    return !fileExtension.toLowerCase().includes('mp4') && !fileExtension.toLowerCase().includes('jpg') && !fileExtension.toLowerCase().includes('png')
                }) ? "pdf" : "Powerpoint(.pptx)"
            }));

            let response;
            if(mode === "download")
            {
                response = await (await fetch('/api/downloadCollection', {
                    method: 'POST',
                    body: JSON.stringify({ collectionName: collectionHeading, collection_files: remadeFiles }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })).json();
            }
            else
            {
                response = await (await fetch('/api/saveCollection', {
                    method: 'POST',
                    body: JSON.stringify({ user: user.email, collectionName: collectionHeading, collection_files: remadeFiles }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })).json();
            }
            console.log("response returned is ", response);
            
            remadeFiles.forEach( (file) =>
            {
                if(file.exportAs === "Powerpoint(.pptx)")
                {
                    let exportPresentation = new pptxgen();
                    
                    file.pages.forEach( (page, pageIndex) => 
                    { 
                        var theSlide = exportPresentation.addSlide();

                        //console.log(page);
                        //console.log(collectionFiles[file.index].pages[pageIndex]);
                        // If current page is a video, get cover page of video, from the invisible canvas
                        let mediaPath = collectionFiles[file.index].pages[pageIndex].data;
                        if(typeof page.pageNumber === 'string' && page.pageNumber.toLowerCase().includes('mp4'))
                        {
                            theSlide.addMedia({ type: "video", path: "http://localhost:3000/files/"+page.pageNumber, x: '25%', y: '2.5%', w: '50%', h: '90%'});
                        }
                        else
                        {
                            theSlide.addImage({ path: mediaPath, x: '25%', y: '2.5%', w: '50%', h: '96%'})
                        }
                    });

                    var exportData = {
                        file_name: file.name,
                        collection_name: collectionHeading
                    };
                    
                    exportPresentation.writeFile({  fileName:  file.name }).then(() => {
                        // This is a temporary solution for a minimum viable product
                        // When the file is done downloading, send a request to the server to copy it to the collection directory
                        console.log("Done exporting powerpoint file...");

                        setTimeout(async function copyPowerpoint() {                                
                            const res = await (await fetch('/api/createPowerpoint', {
                                method: 'POST',
                                body: JSON.stringify(exportData),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })).json();
                        }, 500);
                    });
                }
            });

            alert(response);
        }
        catch(e)
        {
            console.log("Error happens in second box and it says: ", e)
        }
        
        //console.log("The collection has: ", collectionFiles);
        //console.log(fileData);

        /* try{
            const pdfDoc = await PDFDocument.create()
            const page = pdfDoc.addPage()
            page.drawText('You can create PDFs!')
            const pdfBytes = await pdfDoc.save()
        }
        catch(e)
        {
            console.log("Error happens in first box and it says: ", e)
        }
        
        try{
            let urL = fileData["percyjack.pdf"].fileUrl;
            console.log("the file url given was: ", urL);
            const existingPdfBytes = await fetch(urL).then(res => res.arrayBuffer())
            const pdfDoc_two = await PDFDocument.load(urL)
            const pages_two = pdfDoc_two.getPages()
            const pdfBytes_two = await pdfDoc_two.save() 
            console.log(pdfBytes_two);
            //setDownloadThingy(pdfBytes_two);
            const generatedFileUrl = URL.createObjectURL(new Blob(pdfBytes_two, {type: "application/pdf"}));
            console.log("generated blob is", generatedFileUrl);
            //URL.revokeObjectURL(generatedFileUrl);
            /* const fs = dynamic(
                () => import('fs'),
                { ssr: true }
            );
            fs.writeFileSync('/files/testings.pdf', pdfBytes_two); 
            //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
        }
        catch(e)
        {
            console.log("Error happens in second box and it says: ", e)
        } */
        
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
                            <SortableList items={pagesSelected} onSortEnd={onSortEnd} axis='xy' pressDelay={50} removePage={removePage} getDraggableKey={getDraggableKey} />
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
                    <button onClick={collectionFiles.length === 0 ? () => console.log(user) :() => downloadCollection("download")} id="download-collection" className="collection-post-btns">Download</button>
                    <button onClick={collectionFiles.length === 0 || !user ? () => {} :() => downloadCollection("save")} id="save-collection" className={user ? "collection-post-btns": "collection-post-btns inactive"}>Save</button>
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