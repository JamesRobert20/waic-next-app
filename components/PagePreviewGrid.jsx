import { useState, useCallback, useEffect, useRef } from 'react'
import PageNavigationBtn from './PageNavigationBtn'

function PagePreviewGrid({ imageData, pagesChosen, blurred, fileSelected }) {
    const [pageInView, setPageInView] = useState("");
    const [prevShouldAppear, setPrevShouldAppear] = useState(false);
    const [nextShouldAppear, setNextShouldAppear] = useState(false);

    let pagesList = useRef();
    let scrollAmount = useRef(0);
    let pagesOffsets = useRef([]);
    let pageKeys = useRef([]);
    
    const getKey = () => {
        let item;
        do
        {
            item = Math.floor(Math.random() * 10000);
        }
        while (pageKeys.current.includes(item))
        pageKeys.current = [...pageKeys.current, item];
        return item;
    }
    
    useEffect(() => {
        setPrevShouldAppear(false);
        setNextShouldAppear(false);
        setPageInView("");
        scrollAmount.current = 0;
        pagesList.current.scrollLeft = 0;

        let arr = [];
        for(let hj = 0; hj < imageData.length; hj++)
            arr[hj] = pagesList.current.childNodes[hj].offsetLeft - 600;

        pagesOffsets.current = arr;
        //console.log(pagesOffsets);
    },[imageData.length]);

    const getAmountScrolled = pagesListContainer => {
        let x = pagesListContainer.scrollLeft;
        scrollAmount.current = x.toFixed();
        //console.log(scrollAmount.current);
    };

    const updatePageInView = useCallback((index, buttonResponsible) => {
        if(imageData.length === 1)
        {
            setPrevShouldAppear(false);
            setNextShouldAppear(false);
        }
        else if(index === 0)
        {
            setNextShouldAppear(true);
            setPrevShouldAppear(false);
        }
        else if(index === imageData.length - 1)
        {
            setPrevShouldAppear(true);
            setNextShouldAppear(false);
        }
        else
        {
            setPrevShouldAppear(true);
            setNextShouldAppear(true);
        }
        setPageInView("" + index);

        if(buttonResponsible !== "")
        {
            // Procedure to scroll the currently highlighted page into view
            // Uses difference between the initial offsets and the container offset
            let offsetDifference = pagesOffsets.current[index] - scrollAmount.current;
            //console.log(pagesOffsets.current[index]);
            //console.log(scrollAmount.current);
            //console.log(offsetDifference);
            if(offsetDifference < 10)
            {
                offsetDifference = offsetDifference * (-1);
                var quot = ~~((offsetDifference + 10)/100);
                quot++;
                pagesList.current.scrollLeft = pagesList.current.scrollLeft - (quot*120);
            }
            else if(offsetDifference > 480)
            {
                var quot = ~~((offsetDifference - 480)/100);
                quot++;
                pagesList.current.scrollLeft = pagesList.current.scrollLeft + (quot*120);
            }
        }

    }, [imageData]);

    return (
        <>
            <div id="PagePreviewGrid" className={blurred ? "reduced-opacity" : ""}>
                {prevShouldAppear ? 
                    <PageNavigationBtn 
                        buttonName={"previous"}
                        pageInView={ {number: Number(pageInView), update: updatePageInView} } 
                    /> 
                : <></>
                }
                <div id="PagePreviewContainer">
                    { pageInView !== ""? <img src={imageData[Number(pageInView)]} className="singlePage" /> : <></>}
                </div>
                {nextShouldAppear ? 
                    <PageNavigationBtn 
                        buttonName={"next"}
                        pageInView={ {number: Number(pageInView), update: updatePageInView} } 
                    /> 
                : <></>
                }
            </div>
            <div ref={pagesList} 
                className={blurred ? "reduced-opacity" : ""}
                id="PagesListContainer" onScroll={(e) => getAmountScrolled(e.target)}>
                {
                    imageData.map((data, index) => (
                        <div key={getKey()} className="wholeGPageContainer">
                            <div 
                                className={pageInView === (""+index)? "pageDisplayItem-1 galleryPageSelected": "pageDisplayItem-1" } 
                                onClick={() => updatePageInView(index, "")}
                            >
                                <img alt={"Page " + (index + 1)} src={data} className="PagePreviewed" />
                                <div className="pageNumber-1"> {index+1} </div>
                            </div>
                            <div className="tickPageContainer">
                                <input 
                                    type="checkbox" checked={pagesChosen.array[index]} 
                                    className="tickPage" onChange={(e) => pagesChosen.update(index, e.target.checked)}
                                />
                            </div> 
                        </div>  
                    ))
                }
            </div>
        </>
    )
}

export default PagePreviewGrid