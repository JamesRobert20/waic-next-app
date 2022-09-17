import { useEffect, useRef, useState } from 'react';
import CoverPages from './CoverPages';
import Files from './Files';

function FilesList(props) {
    const coverArray = useRef(props.fileslist.map(() => (false)));
    const images = useRef({});

    useEffect(() => {
        //console.log("is it here?", props.fileslist);
        //console.log();
        coverArray.current = props.fileslist.map(() => (false));
        images.current = {};
    }, [props.fileslist])
    //useEffect( () => { /* console.log("hooray ") */ } , [coversLoaded]);

    //console.log(props.fileslist);

    const coverPageDone = (index, filename, data, numPages) => {
        //console.log(filename);
        //console.log("index ", index);
        //console.log("before", coverArray.current);
        let newArray = [...coverArray.current];
        newArray[index] = true;
        coverArray.current = newArray;

        let newObj = {...images.current};
        newObj[filename] = { totalPages: numPages, pages: [data], index: Math.floor(Math.random() * 10000) };
        images.current = newObj;
        //console.log("after", coverArray.current);
        
        //console.log("ebu tuone ", coverArray.current);
        if(!newArray.includes(false))
        {
            props.coversDoneLoading(images.current);
        }
    };

    return (
        <>
            { !props.coversLoaded ? (<CoverPages fileslist={props.fileslist} coverPageDone={coverPageDone} />): <></>}
            <Files 
                fileSelected={props.fileSelected} files={props.fileslist} fileData={props.fileData} 
                updateFileSelected={props.updateFileSelected} coversLoaded={props.coversLoaded}
            />
        </>
    )
}

export default FilesList