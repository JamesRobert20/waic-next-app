import { useEffect, useRef, useContext } from 'react';
import CoverPages from './CoverPages';
import Files from './Files';
import FilesContext from '../contexts/filesContext'

function FilesList() {
    const { fileslist, coversDoneLoading, coversLoaded } = useContext(FilesContext);

    const coverArray = useRef(fileslist.map(() => (false)));
    const images = useRef({});

    useEffect(() => {
        //console.log("is it here?", fileslist);
        //console.log();
        coverArray.current = fileslist.map(() => (false));
        images.current = {};
    }, [fileslist])
    //useEffect( () => { /* console.log("hooray ") */ } , [coversLoaded]);

    //console.log(fileslist);

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
            coversDoneLoading(images.current);
        }
    };

    return (
        <>
            { !coversLoaded ? (<CoverPages fileslist={fileslist} coverPageDone={coverPageDone} />): <></>}
            <Files />
        </>
    )
}

export default FilesList