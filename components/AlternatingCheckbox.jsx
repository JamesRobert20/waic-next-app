import { useState } from 'react';

function AlternatingCheckbox({ viewmode, checkboxname, pagesChosen }) {
    const [checked, setChecked] = useState(checkboxname === viewmode.mode);

    const handleSelectAll = (selectChecked) => {
        setChecked(selectChecked)
        pagesChosen.change(selectChecked);
    };

    if(checkboxname === "Select All:")
        return ( <input 
                    id={checkboxname} className="preview-nav-checkbox" 
                    type="checkbox" checked={checked || !pagesChosen.array.includes(false)} 
                    onChange={(e) => handleSelectAll(e.target.checked)} 
                />)
  
    return (
    <input 
        id={checkboxname}
        className="preview-nav-checkbox"
        type="checkbox" checked={checkboxname === viewmode.mode} 
        onChange={() => {
            setChecked(!checked);
            viewmode.mode === "List view:" ? viewmode.update("Gallery view:") : viewmode.update("List view:");
        }} 
    />
  )
}

export default AlternatingCheckbox