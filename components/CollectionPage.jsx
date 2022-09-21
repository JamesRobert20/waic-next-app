import { GiCancel } from 'react-icons/gi'
import Video from './Video'

function CollectionPage({ pageSize, pageData, removePage, removeCollectionPage }) {

  return (
    <>
        {pageSize === "single-view" ?
            <div className={"wholeSlideContainer"}>                
                <div className={"pageDisplayItem-2 deckItem deckLowerItem"}>
                    {typeof pageData.name === 'string' && pageData.name.includes('mp4') ?
                        <Video url={pageData.sourceData} mode={"preview"} classNameGiven={"filePagePreviewed-1"} /> :
                        <img alt={"page "+pageData.name} src={pageData.sourceData} className={"filePagePreviewed-1"} />
                    }
                    <div className="pageNumber">{pageData.name}</div>
                </div>
                <div className={"cancelContainer deckItem"}>
                    <div title="remove this page" className="cancelBtn" onClick={() => removeCollectionPage(pageData.index)}>
                        <GiCancel className="cancelImg" />
                    </div>
                </div>
            </div>
            :pageSize === "two-view" ?
            <div className={"wholeSlideContainer-2"}>                
                <div className={"pageDisplayItem-2 deckItem deckLowerItem"}>
                    {typeof pageData.name === 'string' && pageData.name.includes('mp4') ?
                        <Video url={pageData.sourceData} mode={"preview"} classNameGiven={"filePagePreviewed-2"} /> :
                        <img alt={"page "+pageData.name} src={pageData.sourceData} className={"filePagePreviewed-2"} />
                    }
                    <div className="mediumPageNumber pageNumber">{pageData.name}</div>
                </div>
                <div className={"cancelContainer deckItem"}>
                    <div title="remove this page" className="cancelBtn" onClick={() => removeCollectionPage(pageData.index)}>
                        <GiCancel className="cancelImg" />
                    </div>
                </div>
            </div>
            :pageSize === "three-view" ?
            <div className={"wholeSlideContainer-3"}>                
                <div className={"pageDisplayItem-3 deckItem deckLowerItem"}>
                    {typeof pageData.name === 'string' && pageData.name.includes('mp4') ?
                        <Video url={pageData.sourceData} mode={"preview"} classNameGiven={"filePagePreviewed-3"} /> :
                        <img alt={"page "+pageData.name} src={pageData.sourceData} className={"filePagePreviewed-3"} />
                    }
                    <div className="pageNumber">{pageData.name}</div>
                </div>
                <div className={"cancelContainer deckItem"}>
                    <div title="remove this page" className="cancelBtn" onClick={() => removeCollectionPage(pageData.index)}>
                        <GiCancel className="cancelImg" />
                    </div>
                </div>
            </div>
            :<div className={"wholeSlideContainer"}>                
                <div className={"pageDisplayItem-2 deckItem deckLowerItem"}>
                    {typeof pageData.name === 'string' && pageData.name.includes('mp4') ?
                        <Video url={pageData.sourceData} mode={"preview"} classNameGiven={"filePagePreviewed_1"} /> :
                        <img alt={"page "+pageData.name} src={pageData.sourceData} className={"filePagePreviewed_1"} />
                    }
                    <div className="pageNumber">{pageData.name}</div>
                </div>
                <div className={"cancelContainer deckItem"}>
                    <div title="remove this page" className="cancelBtn" onClick={() => removePage(pageData.index, 1)}>
                        <GiCancel className="cancelImg" />
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default CollectionPage