import React from 'react';
import RangeInput from './RangeInput';
import Checkboxgroup from './Checkboxgroup';

function PreviewNavbar({ viewmode, range, updateRange, handleRangeSubmit, pagesChosen }) {
  return (
    <div id="filePreviewNavBar">
        <form onSubmit={handleRangeSubmit} style={{display: "flex"}}>
            <button id="select-multiple" className="preview-nav-labels">Select: </button>
            <RangeInput range={range} updateRange={updateRange} />
        </form>
        <Checkboxgroup viewmode={viewmode} pagesChosen={pagesChosen} />
    </div>
  )
}

export default PreviewNavbar