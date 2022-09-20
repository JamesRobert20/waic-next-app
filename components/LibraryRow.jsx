import CollectionFolder from "./CollectionFolder"
import FileObjectViewer from "./FileObjectViewer"
import { useState, useEffect } from 'react'

function LibraryRow({ item, styles }) {
    const yourCollections = ["Geology", "Sex Education", "Calculus", "English", "Law and Pursuit"];
    const [flexibleCollectionList, setFlexibleCollectionList] = useState([]);

    const debounce = (fn, ms)  => {
        let timer
        return _ => {
          clearTimeout(timer)
          timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
          }, ms)
        };
    }

    useEffect(() => {
        const debouncedHandleResize = debounce( () => {
            //console.log("new dimensions are ", window.innerWidth, " x ", window.innerHeight);
            //console.log("There should be ", Math.floor((window.innerWidth+40)/300), " folders");
            setFlexibleCollectionList(
                yourCollections.filter( (item, index) => index < Math.floor((window.innerWidth+40)/300) || (index < 3 && window.innerWidth < 870) )
            );
          
        }, 1000)
        
        if(flexibleCollectionList.length === 0)
        {
            //console.log("first render", window && window.innerWidth);
            //console.log(yourCollections.filter((item, index) => index < Math.floor((window.innerWidth+40)/300)));
            setFlexibleCollectionList(yourCollections.filter((item, index) => index < Math.floor((window.innerWidth+40)/300)));
        }

        window && window.addEventListener('resize', debouncedHandleResize)
    
        return _ => {
          window && window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    return (
        <div className={styles.libraryRowContainer}>
            <h2 className={styles.greyHeading}>{item}</h2>
            <div className={item === "Your Collections" ? styles.libraryRow+" "+styles.hiddenOverflow : styles.libraryRow}>
                { item === "Suggested" ? 
                    ["percyjack.pdf", "WAIC.pdf", "potter.pdf"].map( (file, index) => (
                        <FileObjectViewer styles={styles} file={file} key={index} />
                    ))
                    : item === "Your Collections" ?
                    flexibleCollectionList.map( (folder, index) => (
                        <CollectionFolder styles={styles} folderName={folder} key={index} />
                    ))
                    : ["fake slides.pdf", "tucomanca.pdf", "Tutorial10.pdf"].map( (file, index) => (
                        <FileObjectViewer styles={styles} file={file} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default LibraryRow