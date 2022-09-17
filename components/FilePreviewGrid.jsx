import React from 'react'

function FilePreviewGrid({ imageData, pagesChosen, blurred }) {

    let pageKeys = [];
    
    for(let i = 0; i < imageData.length; i++)
    {
        let item;
        do
        {
            item = Math.floor(Math.random() * 10000);
        }
        while (pageKeys.includes(item))
        
        pageKeys.push(item);
    }

    return (
        <div id="filePreviewGrid" className={blurred ? "reduced-opacity" : ""}>
            {imageData.map( (data, index) => (
                <div 
                    key={pageKeys[index]} onClick={(e) => pagesChosen.update(index, !pagesChosen.array[index])}
                    className={pagesChosen.array[index] ? "pageDisplayItem pageSelected" : "pageDisplayItem"}
                    
                >
                    <img alt={"Page " + (index + 1)} src={data} className="filePagePreviewed" />
                    <div className="pageNumber">{index + 1}</div>
                </div>))
            }
        </div>
    )
}

export default FilePreviewGrid