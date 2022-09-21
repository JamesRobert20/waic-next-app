import React from 'react';
import RangeInput from './RangeInput';
import Checkboxgroup from './Checkboxgroup';

function PreviewNavbar({ handleRangeSubmit }) {
  return (
    <div id="filePreviewNavBar">
        <form onSubmit={handleRangeSubmit} style={{display: "flex"}}>
            <button id="select-multiple" className="preview-nav-labels">Select: </button>
            <RangeInput />
        </form>
        <Checkboxgroup />
    </div>
  )
}

export default PreviewNavbar