import FilesListGridContents from '../components/FilesListGridContents';
import FilterCategories from '../components/FilterCategories';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import InsertIntoCollectionButtons from '../components/InsertIntoCollectionButtons';
import PreviewNavbar from '../components/PreviewNavbar';
import FilePreviewGrid from '../components/FilePreviewGrid';
import PagePreviewGrid from '../components/PagePreviewGrid';
import CollectionContainer from '../components/CollectionContainer';
import AllPages from '../components/AllPages';
import { useState, useCallback, useEffect, useRef, createContext } from 'react';
import TopNavbar from '../components/TopNavbar';
import { FileContextProvider } from '../contexts/filesContext'
import { PreviewNavbarContextProvider } from '../contexts/previewNavbarContexts'

function FileAndCollectionViewer() {
    const [searchFieldContent, setSearchFieldContent] = useState("");
    const [fileTypeTagValue, setFileTypeTagValue] = useState("File Type");
    const [lastModValue, setLastModValue] = useState("File Type");

    const [fileslist, setFileslist] = useState([]);
    const [changingfilelist, setChangingfilelist] = useState(fileslist);
    const [fileData, setFileData] = useState({});
    const [fileSelected, setFileSelected] = useState(null);
    const [range, setRange] = useState({ min: "", max: ""});
    const [viewmode, setViewmode] = useState("List view:");
    
    const [coversLoaded, setCoversLoaded] = useState(false);
    const [isloading, setIsloading] = useState(false);
    const [pagesLoading, setPagesLoading] = useState(false);
    const [filesUploading, setFilesUploading] = useState(true);

    const [pagesChosen, setPagesChosen] = useState([]);
    const [pagesSelected, setPagesSelected] = useState([]);

    const [insertToCollectionBtn, setInsertToCollectionBtn] = useState({ number: 1, mainState: "Add to Deck" });
    

    let pagesData = useRef([]), 
        pageKeys = useRef([]), 
        pagesAdded = useRef({});

    const startLoading = () =>  setIsloading(true);
    const doneLoading = () => setIsloading(false); 

    const changeFileUploadState = state => {
        if(state)
            setFileSelected(null);
            
        setFilesUploading(state);
    };

    const updateInsertToCollectionBtn = numberOfWorkspaces => {
        if(numberOfWorkspaces === 0)
            setInsertToCollectionBtn({ number: 1, mainState: "Add to Deck" });
        else
            setInsertToCollectionBtn({ number: numberOfWorkspaces, mainState: "Insert Into Deck" });
    };

    const coversDoneLoading = images =>
    {
        //console.log("made it here");
        //console.log(images);
        setFileData(images);
        setCoversLoaded(true);
    }

    useEffect( () => {
        if(coversLoaded)
        {
            doneLoading();
        }
    },[coversLoaded]);

    const updateViewmode = state => {
        setViewmode(state);
    };

    const resetPagesAdded = () => {
        pagesAdded.current = {};
    };

    const renewFileslist = newList => {
        //console.log("comparing the two:");
        //console.log("before ", fileslist);
        //console.log("To be ", newList);
        setFileslist(newList);
    }

    useEffect(() => {
        setCoversLoaded(false);
        if(fileslist.length !== 0)
            setIsloading(true);
        setChangingfilelist(fileslist);
    }, [fileslist]);

    const submitPages = () => {
        if(fileSelected.toLowerCase().split('.')[fileSelected.toLowerCase().split('.').length - 1] === "pdf")
        {
            if(pagesChosen.includes(true))
            {
                setPagesSelected([...pagesSelected, 
                    ...pagesChosen.map((page, index) => ({filename: fileSelected, pageNumber: index+1, data: fileData[fileSelected].pages[index]}))
                    .filter(page => pagesChosen[page.pageNumber-1] === true)]);
                setPagesChosen(pagesChosen.map(() => false));
            }
        }
        else
        {
            setPagesSelected([...pagesSelected, {filename: fileSelected, pageNumber: fileSelected, data: fileData[fileSelected].pages[0]} ]);
        }
    };

    const submitMorePages = deckNumber => {
        if(fileSelected.toLowerCase().split('.')[fileSelected.toLowerCase().split('.').length - 1] === "pdf")
        {
            if(pagesChosen.includes(true))
            {
                pagesAdded.current = {
                    deckNo: Number(deckNumber), 
                    pages: pagesChosen.map((page, index) => ({filename: fileSelected, pageNumber: index+1, data: fileData[fileSelected].pages[index]}))
                            .filter(page => pagesChosen[page.pageNumber-1] === true)
                }
                setPagesChosen(pagesChosen.map(() => false));
            }
        }
        else
        {
            pagesAdded.current = {
                deckNo: Number(deckNumber), 
                pages: [{filename: fileSelected, pageNumber: fileSelected, data: fileData[fileSelected].pages[0]}]
            }
            setPagesChosen(pagesChosen.map(() => false));
        }
    };

    const removePage = (page, number) => {
        let arr = [...pagesSelected];
        arr.splice(page, number);
        setPagesSelected(arr); 
    };

    const resetPagesSelected = () => {
        setPagesSelected([]);
    };

    const changePagesSelected = (newArray) => {
        setPagesSelected(newArray);
    };

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 200)
        }
    };

    const updateSearchFieldContent = content => {
        setSearchFieldContent(content);
    };

    const updateFileTypeFilter = content => {
        setFileTypeTagValue(content);
    };

    const updateLastModFilter = content => {
        setLastModValue(content);
    };

    const optimisedVersion = useCallback(debounce(updateSearchFieldContent), []);

    const matchFileTypeTag = extension => {
        //console.log(fileTypeTagValue);
        if(fileTypeTagValue === "File Type") return true;
        else
        {
            var extFromTag = fileTypeTagValue.substring(fileTypeTagValue.indexOf("(")+2).replace(")", "");

            if(fileTypeTagValue.includes("jpg/png"))
                return extFromTag.split("/")[0] === extension.toLowerCase() || extFromTag.split("/")[1] === extension.toLowerCase();
            else
                return extFromTag === extension.toLowerCase();
        }
    };

    const filterFiles = () => {
        var newList = fileslist.filter( (file) => {
            var Splitted = file.filename.split('.');
            var fileExtension = Splitted[Splitted.length - 1];

            return  /* matchLastModTag(file.filename) && */ matchFileTypeTag(fileExtension) &&  file.filename.slice(0, file.filename.indexOf(fileExtension) - 1).toLowerCase().includes(searchFieldContent.toLowerCase());
        });

        setChangingfilelist(newList);
    };

    useEffect(() => {
        //console.log("content is ", searchFieldContent);
        filterFiles();
    }, [searchFieldContent, fileTypeTagValue, lastModValue]);

    const updateRange = (type, value) => {
        range[type] = value;
        setRange(range);
    };

    const updateFileData = newData => {
        setFileData(newData);
        setPagesLoading(false);
    };

    const updateFileSelected = filename => {
        setFileSelected(filename === "" ? null : filename);
    };

    useEffect(() => {
        setPagesLoading(false);   
        //console.log("command set");   
        if( !pagesLoading && fileSelected)
        {
            let splitFilename = fileSelected.toLowerCase().split('.');
            if(splitFilename[splitFilename.length - 1] === "mp4")
            {
                setViewmode("List view:");
            }
            else if(splitFilename[splitFilename.length - 1] === "png")
            {
                setViewmode("List view:");
            }
            else if(splitFilename[splitFilename.length - 1] === "pdf")
            {
                if(fileData[fileSelected].pages.length !== fileData[fileSelected].totalPages) 
                {
                    let pages = [];
                    for(let i = 2; i <= fileData[fileSelected].totalPages; i++)
                    {
                        pages.push(i);
                    }   
                    pagesData.current = pages;
                    setPagesLoading(true);
                }

                let arr = [];
                for(let i = 0; i < fileData[fileSelected].totalPages; i++)
                {
                    let item;
                    do
                    {
                        item = Math.floor(Math.random() * 10000);
                    }
                    while (arr.includes(item))
                    
                    arr.push(item);
                }
                pageKeys.current = arr;
        
                setPagesChosen(pageKeys.current.map(() => (false)));
            }
        }
    }, [fileSelected]);

    const updatePagesChosen = (index, checked) => {
        setPagesChosen([...pagesChosen.slice(0, index), checked, ...pagesChosen.slice(index+1, pagesChosen.length)]);
    };
    
    const controlAllPages = selected => {
        setPagesChosen(pagesChosen.map(() => (selected)));
    };

    useEffect(() => {
        //console.log("command achieved");
        if( !pagesLoading && fileSelected)
        {
            let splitFilename = fileSelected.toLowerCase().split('.');
            if(splitFilename[splitFilename.length - 1] === "mp4")
            {

            }
            else if(splitFilename[splitFilename.length - 1] === "png")
            {

            }
            else if(splitFilename[splitFilename.length - 1] === "pdf")
            {
                if(fileData[fileSelected].pages.length !== fileData[fileSelected].totalPages) 
                {
                    let pages = [];
                    for(let i = 2; i <= fileData[fileSelected].totalPages; i++)
                    {
                        pages.push(i);
                    }   
                    pagesData.current = pages;
                    setPagesLoading(true);
                }

                let arr = [];
                for(let i = 0; i < fileData[fileSelected].totalPages; i++)
                {
                    let item;
                    do
                    {
                        item = Math.floor(Math.random() * 10000);
                    }
                    while (arr.includes(item))
                    
                    arr.push(item);
                }
                pageKeys.current = arr;
        
                setPagesChosen(pageKeys.current.map(() => (false)));
            }
        }
    }, [pagesLoading]);

    const handleRangeSubmit = e => {
        e.preventDefault();
        var minRange = Number(range["min"].trim());
        var maxRange = Number(range["max"].trim());

        setPagesChosen(pagesChosen.map((elem, index) => (index >= minRange - 1 && index <= maxRange - 1 )));
    };

    //console.log("The App re rendered");

    return (
        <>
            { isloading ? <Loader loadSize={"huge"} />: <></> }
            <div id="root-container" className={ isloading ? "pageContainer loading-opacity": "pageContainer"}>
                <TopNavbar />
                <center>
                    <div id="fileSelectionGrids">
                        <div id="allFilesGridView" className="fileSelectionGrids-item">
                            <h2 style={{margin: "0", color: "green"}} >All Files</h2>
                            <SearchBar 
                                updateContent={optimisedVersion} barClassName={"search-bar"} inputClassName={"search-field"} 
                            />
                            <FilterCategories
                                filterTagsClass={"search-tags-container"}
                                updateFileTypeFilter={updateFileTypeFilter} updateLastModFilter={updateLastModFilter}  
                            />
                            <FileContextProvider value={{ 
                                fileData, coversLoaded, renewFileslist, coversDoneLoading, fileslist: changingfilelist, 
                                originalList: fileslist, changeFileUploadState, fileSelected, updateFileSelected 
                            }}>
                                <FilesListGridContents filesUploading={filesUploading} changeFileUploadState={changeFileUploadState} />  
                            </FileContextProvider>    
                        </div>
                        <div id="filePreviewContainer" className="fileSelectionGrids-item">
                            { pagesLoading && fileSelected ? 
                                <Loader loadSize={"small"} /> :
                                <></>
                            }
                            { fileSelected && !filesUploading ? 
                                viewmode === "List view:" ? 
                                    <FilePreviewGrid 
                                        fileSelected={fileSelected} blurred={pagesLoading && fileSelected}
                                        pagesChosen={ {array: pagesChosen, update: updatePagesChosen} }
                                        imageData={fileData[fileSelected].pages} /> 
                                    :<PagePreviewGrid 
                                        fileSelected={fileSelected} blurred={pagesLoading && fileSelected}
                                        pagesChosen={ { array: pagesChosen, update: updatePagesChosen} }
                                        imageData={fileData[fileSelected].pages} /> 
                                :(<></>) 
                            }
                            { fileSelected && !filesUploading && 
                                fileSelected.toLowerCase().split('.')[fileSelected.toLowerCase().split('.').length - 1] === "pdf" ?  
                                <PreviewNavbarContextProvider value={{ 
                                    viewmode: {mode: viewmode, update: (mode) => updateViewmode(mode)},  range,
                                    pagesChosen: {array: pagesChosen, change: controlAllPages}, updateRange
                                }}>
                                    <PreviewNavbar handleRangeSubmit={handleRangeSubmit} />
                                </PreviewNavbarContextProvider> : 
                                (<></>)
                            }
                            { pagesLoading && fileSelected ? 
                                <AllPages 
                                    updateFileData={updateFileData} filename={fileSelected} 
                                    fileData={fileData} pagesData={pagesData.current} 
                                />: 
                                <></>
                            }
                        </div>
                        <InsertIntoCollectionButtons submitPages={submitPages} submitMorePages={submitMorePages} insertToCollectionBtn={insertToCollectionBtn} />
                    </div>
                    <CollectionContainer 
                        pagesSelected={pagesSelected} removePage={removePage} pagesAdded={pagesAdded.current} resetPagesSelected={resetPagesSelected} 
                        changePagesSelected={changePagesSelected} updateInsertToCollectionBtn={updateInsertToCollectionBtn}  resetPagesAdded={resetPagesAdded}
                    />
                </center>
            </div>
        </>
    );
}

export default FileAndCollectionViewer